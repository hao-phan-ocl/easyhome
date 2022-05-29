import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { Room } from 'src/rooms/room.schema'

export type OwnerDocument = Owner & Document

@Schema()
export class Owner {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Room' }] })
  properties?: Room[]
}

export const OwnerSchema = SchemaFactory.createForClass(Owner)
