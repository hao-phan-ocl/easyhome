import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateTenantDto } from './create-tenant.dto'

import { TenantsService } from './tenants.service'

@Controller('users')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get('/all')
  getAll() {
    return this.tenantsService.getAll()
  }

  @Post('/create')
  async createUser(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.createUser(createTenantDto)
  }
}
