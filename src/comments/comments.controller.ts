import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  ValidationPipe,
} from '@nestjs/common';

@Controller('courses/:courseId/lessons/:lessonId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('lessonId') lessonId: string,
    @Param('courseId') courseId: string,
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(+lessonId, createCommentDto);
  }

  @Get()
  findAll(@Param('lessonId') lessonId: string, @Param('courseId') courseId: string) {
    return this.commentsService.findAll(+lessonId, +courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
