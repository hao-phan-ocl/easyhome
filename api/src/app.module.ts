import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

import { RoomsModule } from './rooms/rooms.module'
import { TenantsModule } from './tenants/tenants.module'
import { OwnersModule } from './owners/owners.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { RolesGuard } from './users/roles.guard'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/easyhome'),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TenantsModule,
    RoomsModule,
    OwnersModule,
    AuthModule,
    UsersModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule {}
