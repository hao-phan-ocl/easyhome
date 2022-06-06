import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { RoomsModule } from './rooms/rooms.module'
import { TenantsModule } from './tenants/tenants.module'
import { OwnersModule } from './owners/owners.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/easyhome'),
    ConfigModule.forRoot({ isGlobal: true }),
    TenantsModule,
    RoomsModule,
    OwnersModule,
    AuthModule,
  ],
})
export class AppModule {}
