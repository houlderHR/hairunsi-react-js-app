import { Request, Response } from 'express';
import PostService from '../services/post.service';
import { Post } from '../entities/post.entity';
import { UpdateResult } from 'typeorm';
import { StatusCodes } from 'http-status-codes';

class PostController {
  async create(req: Request, res: Response) {
    try {
      const createdPost: Post = await PostService.createPost(req.body);
      return res.status(StatusCodes.CREATED).json(createdPost);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getAll(req: Request, res: Response) {
    let relations = Object.keys(req.query).map((query) => query);

    try {
      const posts: Post[] = await PostService.getAllPosts(relations);
      return res.status(StatusCodes.OK).json(posts);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getAllByDepartment(req: Request, res: Response) {
    let relations = Object.keys(req.query).map((query) => query);
    const id = req.params.id;

    try {
      const posts: Post[] = await PostService.getAllPostsByDepartment(id, relations);
      return res.status(StatusCodes.OK).json(posts);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
  async getOne(req: Request, res: Response) {
    let relations = Object.keys(req.query).map((query) => query);

    try {
      const id: string = req.params.id;
      const post: Post = await PostService.getPost(id, relations);
      return res.status(StatusCodes.OK).json(post);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async updateName(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const post: Post | UpdateResult = await PostService.updatePost(id, req.body);
      return res.status(StatusCodes.OK).json(post);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      await PostService.deleteOnePost(id);
      return res.status(StatusCodes.OK).json({ message: 'Poste supprimé' });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}

export default new PostController();
