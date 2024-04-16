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
    try {
      const poste: CreateAndUpdatePostDto = new Post();
      poste.name = postDto.name;
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

  async getAllPosts(): Promise<Post[]> {
    try {
      const posts = await AppDataSource.getRepository(Post).find();
      return posts;
    } catch (error) {
      throw new HttpNotFoundException('Aucun poste existant');
    }
  }

  async getPost(id: string): Promise<Post> {
    const post: Post[] = await AppDataSource.getRepository(Post).findBy({ id });
    if (post.length) return post[0];
    else throw new HttpNotFoundException('Aucun poste existant avec cet identifiant');
  }

  async updateNameOfPost(
    id: string,
    updatePostDto: CreateAndUpdatePostDto,
  ): Promise<Post | UpdateResult> {
    const changedName: CreateAndUpdatePostDto = plainToClass(CreateAndUpdatePostDto, updatePostDto);
    const errors = await validate(plainToClass(CreateAndUpdatePostDto, changedName));
    if (errors.length > 0) {
      const errorsMessage = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));
      throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, errorsMessage);
    }

    if ((await this.getPost(id)) instanceof HttpNotFoundException) return this.getPost(id);
    if (!(await this.postWithThisNameAlreadyExists(changedName.name))) {
      const post = await AppDataSource.getRepository(Post).update(
        {
          id,
        },
        { name: changedName.name },
      );
      if (post.affected > 0) return post;
      throw new HttpNotFoundException("Aucun poste n'a été modifié");
    } else if (await this.postWithThisNameAlreadyExists(changedName.name))
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
