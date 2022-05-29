import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RegisterOwnerDto } from './register-owner.dto'
import { Owner, OwnerDocument } from './owner.schema'

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
  ) {}

  async getAll(): Promise<Owner[]> {
    return await this.ownerModel.find()
  }

  async registerOwner(registerOwnerDto: RegisterOwnerDto): Promise<Owner> {
    return await this.ownerModel.create(registerOwnerDto)
  }
}
