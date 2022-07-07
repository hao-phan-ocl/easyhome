import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator'
import { Role } from '../enum/role.enum'

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

  @IsEnum(Role)
  role: string
}
