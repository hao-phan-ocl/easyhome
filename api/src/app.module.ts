import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { RoomsModule } from './rooms/rooms.module'
import { TenantsModule } from './tenants/tenants.module'

@Module({
  imports: [
    TenantsModule,
    RoomsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/easyhome'),
  ],
})
export class AppModule {}
