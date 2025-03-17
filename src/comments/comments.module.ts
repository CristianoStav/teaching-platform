import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommonModule } from 'src/common/common.module';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [CommonModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
