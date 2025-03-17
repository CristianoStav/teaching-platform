import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  create(lessonId: number, createCommentDto: CreateCommentDto) {
    return this.commentsRepository.create(lessonId, createCommentDto);
  }

  findAll(lessonId: number, courseId: number) {
    return this.commentsRepository.findAll(lessonId, courseId); 
  }

  findOne(id: number) {
    return this.commentsRepository.findOne(id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentsRepository.update(id, updateCommentDto);
  }

  remove(id: number) {
    return this.commentsRepository.remove(id);
  }
}
