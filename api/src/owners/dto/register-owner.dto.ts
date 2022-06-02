import { IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterOwnerDto {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsEmail()
  email: string

  properties?: string[]
}
