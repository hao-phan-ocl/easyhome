import mongoose, { Document } from 'mongoose'
import {
  BathroomEnum,
  FurnishedEnum,
  HousingTypeEnum,
  KitchenEnum,
} from './enum/room.enum'

export type RoomDocument = Document & {
  owner: mongoose.Types.ObjectId
  housingType: string
  surface: number
  rent: number
  availableFrom: Date
  bathroomType: string
  kitchenType: string
  smoking: boolean
  pets: boolean
  furnished: string
  address: {
    street: string
    streetNumber: number
    postalCode: string
    municipality: string
  }
}

export const RoomSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  housingType: { type: String, enum: HousingTypeEnum, required: true },
  surface: { type: Number, required: true },
  rent: { type: Number, required: true },
  availableFrom: { type: Date, required: true },
  bathroomType: { type: String, enum: BathroomEnum, required: true },
  kitchenType: { type: String, enum: KitchenEnum, required: true },
  smoking: { type: Boolean, required: true },
  pets: { type: Boolean, required: true },
  furnished: { type: String, enum: FurnishedEnum, required: true },
  address: {
    street: { type: String, required: true },
    streetNumber: { type: Number, required: true },
    postalCode: { type: String, required: true },
    municipality: { type: String, required: true },
  },
})
