import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class LessonsRepository {
  constructor(private prisma: PrismaService) {}

  create(courseId: number, data: CreateLessonDto) {
    return this.prisma.lesson.create({ data: { ...data, courseId } });
  }

  findAll(courseId: number) {
    return this.prisma.lesson.findMany({
      where: { courseId },
      include: { comments: true },
      omit: { courseId: true },
    });
  }

  findOne(id: number) {
    return this.prisma.lesson.findFirst({
      where: { id },
      include: { comments: { omit: { lessonId: true } } },
    });
  }

  update(id: number, data: UpdateLessonDto) {
    return this.prisma.lesson.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
