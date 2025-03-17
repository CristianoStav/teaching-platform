import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CommonModule } from 'src/common/common.module';
import { LessonsController } from './lessons.controller';
import { LessonsRepository } from './lessons.repository';

@Module({
  imports: [CommonModule],
  controllers: [LessonsController],
  providers: [LessonsService, LessonsRepository],
})
export class LessonsModule {}
