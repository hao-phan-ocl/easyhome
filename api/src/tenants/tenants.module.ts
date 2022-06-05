import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TenantsService } from './tenants.service'
import { TenantsController } from './tenants.controller'
import { TenantSchema } from './tenant.schema'
import { RoomSchema } from 'src/rooms/room.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tenant', schema: TenantSchema }]),
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
  ],
  controllers: [TenantsController],
  providers: [TenantsService],
  exports: [TenantsService],
})
export class TenantsModule {}
