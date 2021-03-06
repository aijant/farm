import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
  @ApiProperty({ description: 'This is name of an animal' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'This is age of an animal' })
  @IsNumber()
  readonly age: number;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly status: string[];
}
