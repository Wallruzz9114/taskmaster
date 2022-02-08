import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  constructor(name: string, description: string, userId: number) {
    (this.name = name), (this.description = description), (this.userId = userId);
  }
}
