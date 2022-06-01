import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator'

export class AddRoomDto {
  @IsNotEmpty()
  @IsMongoId()
  owner: string

  @IsNotEmpty()
  housingType: string

  @IsNotEmpty()
  surface: number

  @IsNotEmpty()
  rent: number

  @IsNotEmpty()
  @IsDate()
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
  furnished: boolean

  @IsNotEmpty()
  street: string

  @IsNotEmpty()
  streetNumber: number

  @IsNotEmpty()
  postalCode: number

  @IsNotEmpty()
  municipality: string
}
