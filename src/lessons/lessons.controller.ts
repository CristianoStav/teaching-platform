import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('courses/:courseId/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(
    @Param('courseId') courseId: string,
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createLessonDto: CreateLessonDto,
  ) {
    return this.lessonsService.create(+courseId, createLessonDto);
  }

  @Get()
  findAll(@Param('courseId') courseId: string) {
    return this.lessonsService.findAll(+courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
