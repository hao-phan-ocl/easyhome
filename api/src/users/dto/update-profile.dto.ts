import { IsOptional, IsString } from 'class-validator'

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  firstName: string

  @IsOptional()
  @IsString()
  lastName: string

  @IsOptional()
  @IsString()
  country: string

  @IsOptional()
  gender: string
}
