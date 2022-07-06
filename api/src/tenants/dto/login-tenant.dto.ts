import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginTenantDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
