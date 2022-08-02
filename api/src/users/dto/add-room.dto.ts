import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator'
import {
  BathroomEnum,
  FurnishedEnum,
  HousingTypeEnum,
  KitchenEnum,
} from 'src/rooms/enum/room.enum'

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
  @IsEnum(HousingTypeEnum)
  housingType: string

  @IsNotEmpty()
  @IsNumber()
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
  @IsEnum(BathroomEnum)
  bathroomType: string

  @IsNotEmpty()
  @IsEnum(KitchenEnum)
  kitchenType: string

  @IsNotEmpty()
  @IsBoolean()
  smoking: boolean

  @IsNotEmpty()
  @IsBoolean()
  pets: boolean

  @IsNotEmpty()
  @IsEnum(FurnishedEnum)
  furnished: string

  @IsNotEmpty()
  @IsString()
  description: string

  @ValidateNested()
  @Type(() => Address)
  address: Address
}
