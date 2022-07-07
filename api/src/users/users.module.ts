import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UsersSchema } from './user.schema'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { RoomSchema } from 'src/rooms/room.schema'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
