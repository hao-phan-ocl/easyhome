import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterOwnerDto {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  properties?: string[]
}
