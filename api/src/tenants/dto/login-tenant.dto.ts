import { IsNotEmpty } from 'class-validator'

export class LoginTenantDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}
