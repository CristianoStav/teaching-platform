import { Course } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class CourseRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCourseDto): Promise<Course> {
    return this.prisma.course.create({ data });
  }

  list(): Promise<Course[]> {
    return this.prisma.course.findMany({
      include: {
        lessons: { include: { comments: true }, omit: { courseId: true } },
      },
    });
  }

  findOne(id: number): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        lessons: { include: { comments: true }, omit: { courseId: true } },
      },
    });
  }

  update(id: number, data: UpdateCourseDto): Promise<Course> {
    return this.prisma.course.update({ where: { id }, data });
  }

  remove(id: number): Promise<Course> {
    return this.prisma.course.delete({ where: { id } });
  }
}
