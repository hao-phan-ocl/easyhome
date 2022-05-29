export class AddRoomDto {
  owner: string
  housingType: string
  surface: number
  rent: number
  availableFrom: Date
  numberOfPrivateRooms: number
  numberOfSharedRooms: number
  bathRoomType: string
  kitchenType: string
  furnished: boolean
  street: string
  streetNumber: number
  postalCode: number
  municipality: string
}
