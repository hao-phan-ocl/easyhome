import { IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterTenantDto {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsEmail()
  email?: string

  favLists?: string[]
}
