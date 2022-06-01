import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { Owner } from 'src/owners/owner.schema'

export type RoomDocument = Room & Document

@Schema()
export class Room {
  @Prop({ type: Types.ObjectId, ref: 'Owner' })
  owner: Owner

  @Prop({ required: true })
  housingType: string

  @Prop({ required: true })
  surface: number

  @Prop({ required: true })
  rent: number

  @Prop({ required: true })
  availableFrom: Date

  @Prop({ required: true })
  bathroomType: string

  @Prop({ required: true })
  kitchenType: string

  @Prop({ required: true })
  smoking: string

  @Prop({ required: true })
  pets: string

  @Prop({ required: true })
  furnished: string

  @Prop({ required: true })
  street: string

  @Prop({ required: true })
  streetNumber: number

  @Prop({ required: true })
  postalCode: string

  @Prop({ required: true })
  municipality: string
}

export const RoomSchema = SchemaFactory.createForClass(Room)
