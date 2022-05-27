import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type TenantDocument = Tenant & Document

@Schema()
export class Tenant {
  @Prop()
  name: string
}

export const TenantSchema = SchemaFactory.createForClass(Tenant)
