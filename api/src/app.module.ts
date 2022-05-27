import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TenantsModule } from './tenants/tenants.module'

@Module({
  imports: [
    TenantsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/bestbuy'),
  ],
})
export class AppModule {}
