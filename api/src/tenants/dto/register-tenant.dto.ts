import { IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterTenantDto {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsEmail()
  email: string

  favLists?: string[]
}
