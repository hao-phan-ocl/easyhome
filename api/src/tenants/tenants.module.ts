import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TenantsService } from './tenants.service'
import { TenantsController } from './tenants.controller'
import { Tenant, TenantSchema } from './tenant.schema'
import { Room, RoomSchema } from 'src/rooms/room.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}
