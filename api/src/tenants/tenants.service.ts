import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateTenantDto } from './create-tenant.dto'
import { Tenant, TenantDocument } from './tenant.schema'

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>,
  ) {}

  async getAll() {
    return await this.tenantModel.find()
  }

  async createUser(createUserDto: CreateTenantDto): Promise<Tenant> {
    return await this.tenantModel.create(createUserDto)
  }
}
