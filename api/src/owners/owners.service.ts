import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

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

  async findOne(email: string): Promise<TenantDocument | undefined> {
    return await this.ownerModel.findOne({ email: email })
  }

  async registerOwner(
    registerOwnerDto: RegisterOwnerDto,
  ): Promise<OwnerDocument> {
    // Check if email is already registered as tenant or owner before
    const checkEmailFromOwner = await this.ownerModel.findOne({
      email: registerOwnerDto.email,
    })

    const checkEmailFromTenant = await this.tenantModel.findOne({
      email: registerOwnerDto.email,
    })

    if (checkEmailFromOwner || checkEmailFromTenant) {
      throw new ConflictException(
        'An account already exists with that email address',
      )
    }

    // Hasing password with bcrypt
    const salt = await bcrypt.genSalt(10)
    registerOwnerDto.password = await bcrypt.hash(
      registerOwnerDto.password,
      salt,
    )

    return await this.ownerModel.create(registerOwnerDto)
  }

  async deleteOwner(ownerId: string) {
    const foundOwner = await this.ownerModel.findByIdAndDelete(ownerId)

    if (!foundOwner) {
      throw new NotFoundException('Owner not found')
    }

    foundOwner.properties.map(
      async (roomId) => await this.roomModel.findByIdAndDelete(roomId),
      async (roomId) => await this.tenantModel.findByIdAndDelete(roomId),
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
