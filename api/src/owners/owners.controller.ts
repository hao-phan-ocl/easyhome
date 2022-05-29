import { Body, Controller, Get, Post } from '@nestjs/common'

import { RegisterOwnerDto } from './register-owner.dto'
import { OwnersService } from './owners.service'

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Get('all')
  getAll() {
    return this.ownersService.getAll()
  }

  @Post('register')
  registerOwner(@Body() registerOwnerDto: RegisterOwnerDto) {
    return this.ownersService.registerOwner(registerOwnerDto)
  }
}
