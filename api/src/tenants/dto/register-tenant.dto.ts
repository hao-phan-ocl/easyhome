import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterTenantDto {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  password: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  favLists?: string[]
}
