import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'

import { RoomsModule } from './rooms/rooms.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/easyhome'),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    MulterModule.register({ dest: './upload' }),
    RoomsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
