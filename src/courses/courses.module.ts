import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CommonModule } from 'src/common/common.module';
import { CourseRepository } from './courses.repository';
import { CoursesController } from './courses.controller';

@Module({
  imports: [CommonModule],
  controllers: [CoursesController],
  providers: [CoursesService, CourseRepository],
})
export class CoursesModule {}
