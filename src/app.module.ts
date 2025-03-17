import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [CoursesModule, LessonsModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
