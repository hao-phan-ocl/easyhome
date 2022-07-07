import { Type } from 'class-transformer'
import {
  IsDateString,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsPositive,
  ValidateNested,
} from 'class-validator'

class Address {
  @IsNotEmpty()
  street: string

  @IsNotEmpty()
  streetNumber: number

  @IsNotEmpty()
  postalCode: string

  @IsNotEmpty()
  municipality: string
}

export class AddRoomDto {
  @IsNotEmpty()
  @IsMongoId()
  owner: string

  @IsNotEmpty()
  housingType: string

  @IsNotEmpty()
  @IsPositive()
  surface: number

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  rent: number

  @IsNotEmpty()
  @IsDateString()
  availableFrom: Date

  @IsNotEmpty()
  bathroomType: string

  @IsNotEmpty()
  kitchenType: string

  @IsNotEmpty()
  smoking: string

  @IsNotEmpty()
  pets: string

  @IsNotEmpty()
  furnished: string

  @ValidateNested()
  @Type(() => Address)
  address: Address
}
