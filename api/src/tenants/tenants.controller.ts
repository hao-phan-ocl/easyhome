import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard'

import { LocalAuthGuard } from 'src/auth/local-strategy/local-auth.guard'
import { FavoriteDto } from './dto/favorite.dto'
import { RegisterTenantDto } from './dto/register-tenant.dto'
import { TenantsService } from './tenants.service'

@Controller('tenants')
export class TenantsController {
  constructor(
    private tenantsService: TenantsService,
    private authService: AuthService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get('all')
  getAll() {
    return this.tenantsService.getAll()
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginTenant(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @Post('register')
  registerTenant(@Body() registerTenantDto: RegisterTenantDto) {
    return this.tenantsService.registerTenant(registerTenantDto)
  }

  @UseGuards(JwtAuthGuard)
  @Put('add-favorite')
  addFav(@Body() favDto: FavoriteDto) {
    const { tenantId, roomId } = favDto

    return this.tenantsService.addFav(tenantId, roomId)
  }

  @UseGuards(JwtAuthGuard)
  @Put('remove-favorite')
  removeFav(@Body() favDto: FavoriteDto) {
    const { tenantId, roomId } = favDto

    return this.tenantsService.removeFav(tenantId, roomId)
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('delete/:tenantId')
  deleteTenant(@Param('tenantId') tenantId: string) {
    return this.tenantsService.deleteTenant(tenantId)
  }
}
