import { DeleteResult, UpdateResult } from 'typeorm';
import { ValidationError, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AppDataSource } from '../database/data-source';
import { Post } from '../entities/post.entity';
import { CreateAndUpdatePostDto } from '../dto/post/CreateAndUpdatePostDto';
import HttpException from '../exceptions/HttpException';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import { StatusCodes } from 'http-status-codes';
import departmentService from './department.service';

class PostService {
  async createPost(postDto: CreateAndUpdatePostDto): Promise<Post> {
    const errors = await validate(plainToClass(CreateAndUpdatePostDto, postDto));
    if (errors.length > 0) {
      const errorsMessage = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));
      throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, errorsMessage);
    }
    const poste: Post = new Post();
    poste.department = await departmentService.getDepartmentById(postDto.department);
    poste.name = postDto.name;

    try {
      const saved = await AppDataSource.getRepository(Post).save(poste);
      return saved;
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new HttpException(StatusCodes.CONFLICT, 'Le poste existe déjà');
      }
      throw new InternalServerErrorException();
    }
  }

  async postWithThisNameAlreadyExists(name: string): Promise<boolean> {
    const post = await AppDataSource.getRepository(Post).find({
      where: { name: name },
    });
    if (post.length > 0) return true;
    else return false;
  }

  async getAllPosts(relations?: string[]): Promise<Post[]> {
    try {
      const posts = await AppDataSource.getRepository(Post).find({
        relations: relations,
      });
      return posts;
    } catch (error) {
      throw new HttpNotFoundException('Aucun poste existant');
    }
  }

  async getPost(id: string, relations?: string[]): Promise<Post> {
    const post: Post = await AppDataSource.getRepository(Post).findOne({
      relations: relations,
      where: { id },
    });
    if (post) return post;
    else throw new HttpNotFoundException('Aucun poste existant avec cet identifiant');
  }

  async updatePost(id: string, updatePostDto: CreateAndUpdatePostDto): Promise<Post> {
    const updatePost: CreateAndUpdatePostDto = plainToClass(CreateAndUpdatePostDto, updatePostDto);
    const errors = await validate(plainToClass(CreateAndUpdatePostDto, updatePost));
    if (errors.length > 0) {
      const errorsMessage = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));
      throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, errorsMessage);
    }

    if ((await this.getPost(id)) instanceof HttpNotFoundException) return this.getPost(id);
    if (!(await this.postWithThisNameAlreadyExists(updatePost.name))) {
      const department = await departmentService.getDepartmentById(updatePost.department);
      const post = await AppDataSource.getRepository(Post).update(
        {
          id,
        },
        { name: updatePost.name, department: department },
      );
      if (post.affected > 0) return this.getPost(id, ['department']);
      throw new HttpNotFoundException("Aucun poste n'a été modifié");
    } else if (await this.postWithThisNameAlreadyExists(updatePost.name))
      throw new HttpException(StatusCodes.CONFLICT, 'Le poste existe déjà');

    throw new InternalServerErrorException();
  }

  async deleteOnePost(id: string): Promise<DeleteResult> {
    const deleted = await AppDataSource.getRepository(Post).delete({ id });
    if (deleted.affected > 0) return deleted;
    throw new HttpNotFoundException("Aucun poste n'a été supprimé");
  }
}

export default new PostService();
