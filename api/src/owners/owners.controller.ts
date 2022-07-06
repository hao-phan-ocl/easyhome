import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { LocalAuthGuard } from 'src/auth/local-strategy/local-auth.guard'

import { AddRoomDto } from './dto/add-room.dto'
import { RegisterOwnerDto } from './dto/register-owner.dto'
import { OwnersService } from './owners.service'

@Controller('owners')
export class OwnersController {
  constructor(
    private readonly ownersService: OwnersService,
    private readonly authService: AuthService,
  ) {}

  @Get('all')
  getAll() {
    return this.ownersService.getAll()
  }

  @Post('register')
  registerOwner(@Body() registerOwnerDto: RegisterOwnerDto) {
    return this.ownersService.registerOwner(registerOwnerDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginTenant(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @Delete('delete/:ownerId')
  deleteOwner(@Param('ownerId') ownerId: string) {
    return this.ownersService.deleteOwner(ownerId)
  }

  @Post('add-room')
  addRoom(@Body() addRoomDto: AddRoomDto) {
    return this.ownersService.addRoom(addRoomDto)
  }

  @Delete('remove-room/:roomId')
  removeRoom(@Param('roomId') roomId: string) {
    return this.ownersService.removeRoom(roomId)
  }
}
