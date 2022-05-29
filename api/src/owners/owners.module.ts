import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OwnersService } from './owners.service'
import { OwnersController } from './owners.controller'
import { Owner, OwnerSchema } from './owner.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
