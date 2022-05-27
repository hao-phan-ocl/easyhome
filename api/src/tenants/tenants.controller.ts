import { Body, Controller, Get, Post } from '@nestjs/common'

import { CreateTenantDto } from './create-tenant.dto'
import { TenantsService } from './tenants.service'

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get('/all')
  getAll() {
    return this.tenantsService.getAll()
  }

  @Post('/create')
  createUser(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.createUser(createTenantDto)
  }
}
