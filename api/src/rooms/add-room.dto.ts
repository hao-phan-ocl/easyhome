import { IsNotEmpty } from 'class-validator'

export class AddRoomDto {
  @IsNotEmpty()
  owner: string

  @IsNotEmpty()
  housingType: string

  @IsNotEmpty()
  surface: number

  @IsNotEmpty()
  rent: number

  @IsNotEmpty()
  availableFrom: Date

  @IsNotEmpty()
  bathroomType: string

  @IsNotEmpty()
  kitchenType: string

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
