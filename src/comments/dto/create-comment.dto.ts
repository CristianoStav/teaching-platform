import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Cristiano',
    description: 'The user that is creating the comment',
  })
  user: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'This is a comment',
    description: 'The text of the comment',
  })
  text: string;
}
