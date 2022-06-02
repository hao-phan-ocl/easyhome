import mongoose, { Document } from 'mongoose'

export type TenantDocument = Document & {
  firstName: string
  lastName: string
  email: string
  favLists?: mongoose.Types.ObjectId[]
}

export const TenantSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
})
