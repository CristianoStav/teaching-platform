import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsRepository } from './lessons.repository';

@Injectable()
export class LessonsService {
  constructor(private readonly lessonsRepository: LessonsRepository) {}

  create(courseId: number, createLessonDto: CreateLessonDto) {
    return this.lessonsRepository.create(courseId, createLessonDto);
  }

  findAll(courseId: number) {
    return this.lessonsRepository.findAll(courseId);
  }

  findOne(id: number) {
    return this.lessonsRepository.findOne(id);
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.lessonsRepository.update(id, updateLessonDto);
  }

  remove(id: number) {
    return this.lessonsRepository.remove(id);
  }
}
