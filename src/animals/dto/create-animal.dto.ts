import { IsString, IsNumber } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly age: number;
  @IsString({ each: true })
  readonly status: string[];
}
