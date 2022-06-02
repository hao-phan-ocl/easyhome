import mongoose, { Document } from 'mongoose'

export type RoomDocument = Document & {
  owner: mongoose.Types.ObjectId
  housingType: string
  surface: number
  rent: number
  availableFrom: Date
  bathroomType: string
  kitchenType: string
  smoking: string
  pets: string
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
  housingType: { type: String, required: true },
  surface: { type: Number, required: true },
  rent: { type: Number, required: true },
  availableFrom: { type: Date, required: true },
  bathroomType: { type: String, required: true },
  kitchenType: { type: String, required: true },
  smoking: { type: String, required: true },
  pets: { type: String, required: true },
  furnished: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    streetNumber: { type: Number, required: true },
    postalCode: { type: String, required: true },
    municipality: { type: String, required: true },
  },
})
