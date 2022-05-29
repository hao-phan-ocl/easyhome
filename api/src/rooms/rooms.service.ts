import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AddRoomDto } from './add-room.dto'
import { Room, RoomDocument } from './room.schema'

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async getAll(): Promise<Room[]> {
    return await this.roomModel.find()
  }

  async addRoom(addRoomDto: AddRoomDto): Promise<Room> {
    const addedRoom = await this.roomModel.create(addRoomDto)

    // Add addedRoom id to the referenced owner
  }
}
