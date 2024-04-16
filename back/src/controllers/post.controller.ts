import { Request, Response } from 'express';
import PostService from '../services/post.service';
import { Post } from '../entities/post.entity';
import { UpdateResult } from 'typeorm';
import STATUS_CODE from '../utils/statusCode';

class PostController {
  async create(req: Request, res: Response) {
    try {
      const createdPost: Post = await PostService.createPost(req.body);
      return res.status(STATUS_CODE.CREATED.status).json(createdPost);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const posts: Post[] = await PostService.getAllPosts();
      return res.status(STATUS_CODE.OK.status).json(posts);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const post: Post = await PostService.getPost(id);
      return res.status(STATUS_CODE.OK.status).json(post);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async updateName(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const post: Post | UpdateResult = await PostService.updateNameOfPost(id, req.body);
      return res.status(STATUS_CODE.OK.status).json(post);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      await PostService.deleteOnePost(id);
      return res.status(STATUS_CODE.OK.status).json({ message: 'Poste supprimé' });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}

export default new PostController();
