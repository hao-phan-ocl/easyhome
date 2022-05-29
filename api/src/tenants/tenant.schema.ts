import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type TenantDocument = Tenant & Document

@Schema()
export class Tenant {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true })
  email: string

  @Prop([String])
  favLists?: string[]
}

export const TenantSchema = SchemaFactory.createForClass(Tenant)
