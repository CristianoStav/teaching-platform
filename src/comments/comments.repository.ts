import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(lessonId: number, data: CreateCommentDto) {
    return this.prisma.comments.create({
      data: {
        ...data,
        lessonId,
      },
    });
  }

  findAll(lessonId: number, courseId: number) {
    return this.prisma.comments.findMany({
      where: { lessonId, Lesson: { courseId } },
      omit: { lessonId: true },
    });
  }

  findOne(id: number) {
    return this.prisma.comments.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateCommentDto) {
    return this.prisma.comments.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.comments.delete({
      where: { id },
    });
  }
}
