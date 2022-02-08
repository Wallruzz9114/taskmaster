import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(firstName: string, lastName: string, email: string) {
    (this.firstName = firstName), (this.lastName = lastName), (this.email = email);
  }
}
