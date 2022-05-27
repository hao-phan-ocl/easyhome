import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Room, RoomDocument } from './room.schema'

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModal: Model<RoomDocument>) {}

  async getAll(): Promise<Room[]> {
    return await this.roomModal.find()
  }
}
