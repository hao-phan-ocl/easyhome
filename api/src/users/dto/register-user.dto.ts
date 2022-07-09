import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class RegisterUserDto {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  password: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsOptional()
  role: string
}
