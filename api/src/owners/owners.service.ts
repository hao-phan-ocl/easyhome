import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RegisterOwnerDto } from './dto/register-owner.dto'
import { RoomDocument } from 'src/rooms/room.schema'
import { OwnerDocument } from './owner.schema'
import { TenantDocument } from 'src/tenants/tenant.schema'
import { AddRoomDto } from './dto/add-room.dto'

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel('Owner') private ownerModel: Model<OwnerDocument>,
    @InjectModel('Room') private roomModel: Model<RoomDocument>,
    @InjectModel('Tenant') private tenantModel: Model<TenantDocument>,
  ) {}

  async getAll(): Promise<OwnerDocument[]> {
    return await this.ownerModel.find()
  }

  async registerOwner(
    registerOwnerDto: RegisterOwnerDto,
  ): Promise<OwnerDocument> {
    return await this.ownerModel.create(registerOwnerDto)
  }

  async deleteOwner(ownerId: string) {
    const foundOwner = await this.ownerModel.findByIdAndDelete(ownerId)

    if (!foundOwner) {
      throw new NotFoundException('Owner not found')
    }

    foundOwner.properties.map(
      async (roomId) => await this.roomModel.findByIdAndDelete(roomId),
      async (roomId) => await this.tenantModel.findById(roomId),
    )

    return 'Owner deleted successfully'
  }

  async addRoom(addRoomDto: AddRoomDto): Promise<RoomDocument> {
    const { owner } = addRoomDto

    const foundOwner = await this.ownerModel.findById(owner)

    if (!foundOwner) {
      throw new NotFoundException('Owner not found')
    }

    const addedRoom = await this.roomModel.create(addRoomDto)

    // Add addedRoom id to the referenced owner
    await this.ownerModel.findByIdAndUpdate(addedRoom.owner, {
      $push: { properties: addedRoom._id },
    })

    return addedRoom
  }

  async removeRoom(roomId: string) {
    const foundRoom = await this.roomModel.findByIdAndDelete(roomId)

    if (!foundRoom) {
      throw new NotFoundException('Room not found')
    }

    // Remove addedRoom id to the referenced owner
    await this.ownerModel.findByIdAndUpdate(foundRoom.owner, {
      $pull: { properties: roomId },
    })

    return 'Room removed successfully'
  }
}
