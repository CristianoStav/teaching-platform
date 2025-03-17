import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Learning JavaScript',
    required: true,
    description: 'The name of the course'
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Programming',
    required: true,
    description: 'The category of the course'
  })
  category: string;
}
