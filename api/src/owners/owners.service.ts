import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RegisterOwnerDto } from './dto/register-owner.dto'
import { OwnerDocument } from './owner.schema'

@Injectable()
export class OwnersService {
  constructor(@InjectModel('Owner') private ownerModel: Model<OwnerDocument>) {}

  async getAll(): Promise<OwnerDocument[]> {
    return await this.ownerModel.find()
  }

  async registerOwner(
    registerOwnerDto: RegisterOwnerDto,
  ): Promise<OwnerDocument> {
    return await this.ownerModel.create(registerOwnerDto)
  }
}
