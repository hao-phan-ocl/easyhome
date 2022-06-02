import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { OwnerDocument } from 'src/owners/owner.schema'
import { AddRoomDto } from './dto/add-room.dto'
import { RoomDocument } from './room.schema'
import { SearchDto } from './dto/search.dto'

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel('Room') private roomModel: Model<RoomDocument>,
    @InjectModel('Owner') private ownerModel: Model<OwnerDocument>,
  ) {}

  async getAll(): Promise<RoomDocument[]> {
    return await this.roomModel.find()
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

  async search(searchDto: Partial<SearchDto>) {
    const {
      housingType,
      surfaceMin,
      surfaceMax,
      rentMin,
      rentMax,
      availableFrom,
      bathroomType,
      kitchenType,
      smoking,
      pets,
      furnished,
    } = searchDto

    const query: any = {}

    // Housing type
    if (housingType) {
      query.housingType = housingType
    }

    // Bathroom type
    if (bathroomType) {
      query.bathroomType = bathroomType
    }

    // Kitchen type
    if (kitchenType) {
      query.kitchenType = kitchenType
    }

    // Furnished
    if (furnished) {
      query.furnished = furnished
    }

    // Smoking
    if (smoking) {
      query.smoking = smoking
    }

    // Pets
    if (pets) {
      query.pets = pets
    }

    // Rent
    if (rentMin) {
      query.rent = { $gte: rentMin }
    }
    if (rentMax) {
      query.rent = { $lte: rentMax }
    }
    if (rentMin && rentMax) {
      query.rent = { $gte: rentMin, $lt: rentMax }
    }

    // Surface
    if (surfaceMax) {
      query.surface = { $gte: surfaceMax }
    }
    if (surfaceMin) {
      query.surface = { $lte: surfaceMin }
    }
    if (surfaceMin && surfaceMax) {
      query.surface = { $gte: surfaceMin, $lt: surfaceMax }
    }

    // Date
    if (availableFrom) {
      query.availableFrom = { $lte: availableFrom }
    }

    return await this.roomModel.find(query)
  }
}
