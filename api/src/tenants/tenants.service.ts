import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Room, RoomDocument } from 'src/rooms/room.schema'
import { RegisterTenantDto } from './register-tenant.dto'
import { Tenant, TenantDocument } from './tenant.schema'

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  ) {}

  async getAll(): Promise<Tenant[]> {
    return await this.tenantModel.find()
  }

  async registerTenant(registerTenantDto: RegisterTenantDto): Promise<Tenant> {
    return await this.tenantModel.create(registerTenantDto)
  }

  async addFav(tenantId: string, roomId: string) {
    const foundTenant = await this.tenantModel.findById(tenantId)
    const foundRoom = await this.roomModel.findById(roomId)

    if (!foundTenant) {
      throw new NotFoundException('Tenant not found')
    }

    if (!foundRoom) {
      throw new NotFoundException('Room not found')
    }

    const existed = await this.tenantModel.exists({
      _id: tenantId,
      favLists: roomId,
    })

    if (existed) {
      throw new InternalServerErrorException('Room already added')
    }

    const updatedTenant = await this.tenantModel.findByIdAndUpdate(
      tenantId,
      {
        $push: { favLists: roomId },
      },
      { new: true },
    )

    return updatedTenant
  }

  async removeFav(tenantId: string, roomId: string) {
    const foundTenant = await this.tenantModel.findById(tenantId)
    const foundRoom = await this.roomModel.findById(roomId)

    if (!foundTenant) {
      throw new NotFoundException('Tenant not found')
    }

    if (!foundRoom) {
      throw new NotFoundException('Room not found')
    }

    const updatedTenant = await this.tenantModel.findByIdAndUpdate(
      tenantId,
      {
        $pull: { favLists: roomId },
      },
      { new: true },
    )

    return updatedTenant
  }
}
