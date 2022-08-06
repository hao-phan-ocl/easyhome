import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RoomDocument } from './room.schema'
import { SearchDto } from './dto/search.dto'

@Injectable()
export class RoomsService {
  constructor(@InjectModel('Room') private roomModel: Model<RoomDocument>) {}

  async getAll(): Promise<RoomDocument[]> {
    const allRoom = await this.roomModel.find()
    return allRoom
  }

  async fetchRoom(roomId: string): Promise<RoomDocument> {
    return await this.roomModel.findById(roomId)
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
      query.housingType = { $in: housingType }
    }

    // Bathroom type
    if (bathroomType) {
      query.bathroomType = { $in: bathroomType }
    }

    // Kitchen type
    if (kitchenType) {
      query.kitchenType = { $in: kitchenType }
    }

    // Furnished
    if (furnished) {
      query.furnished = { $in: furnished }
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
