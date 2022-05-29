import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { RoomsModule } from './rooms/rooms.module'
import { TenantsModule } from './tenants/tenants.module'
import { OwnersModule } from './owners/owners.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/easyhome'),
    TenantsModule,
    RoomsModule,
    OwnersModule,
  ],
})
export class AppModule {}
