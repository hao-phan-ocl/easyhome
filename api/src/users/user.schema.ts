import mongoose, { Document } from 'mongoose'
import { Role } from './enum/role.enum'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  role: string
  email: string
  password?: string
  favLists?: mongoose.Types.ObjectId[]
  properties?: mongoose.Types.ObjectId[]
}

export const UsersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true, default: Role.USER },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  favLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
})
