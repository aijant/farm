import { IsString } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly age: number;
  @IsString({ each: true })
  readonly status: string[];
}
