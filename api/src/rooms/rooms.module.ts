import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Owner, OwnerSchema } from 'src/owners/owner.schema'
import { Room, RoomSchema } from './room.schema'
import { RoomsController } from './rooms.controller'
import { RoomsService } from './rooms.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
