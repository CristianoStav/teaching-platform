import { Injectable } from '@nestjs/common';
import { CourseRepository } from './courses.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CourseRepository) {}

  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.create(createCourseDto);
  }

  findAll() {
    return this.courseRepository.list();
  }

  findOne(id: number) {
    return this.courseRepository.findOne(id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepository.update(id, updateCourseDto);
  }

  remove(id: number) {
    return this.courseRepository.remove(id);
  }
}
