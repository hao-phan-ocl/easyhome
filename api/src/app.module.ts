import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'

import { RoomsModule } from './rooms/rooms.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

const prod = process.env.NODE_ENV

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/easyhome'),
    // ConfigModule.forRoot({ isGlobal: true, cache: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: prod ? '.env.production' : '.env',
      isGlobal: true,
      cache: true,
    }),
    MulterModule.register({ dest: './upload' }),
    RoomsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
