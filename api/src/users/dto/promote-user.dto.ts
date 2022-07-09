import { IsEnum, IsNotEmpty } from 'class-validator'
import { Role } from '../enum/role.enum'

export class PromoteUserDto {
  @IsEnum(Role)
  @IsNotEmpty()
  role: string
}
