import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './create-user.dto'

import { User, UserDocument } from './users.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll() {
    return await this.userModel.find()
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto)
  }
}
