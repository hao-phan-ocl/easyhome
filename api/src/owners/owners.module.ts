import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OwnersService } from './owners.service'
import { OwnersController } from './owners.controller'
import { OwnerSchema } from './owner.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Owner', schema: OwnerSchema }]),
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
