import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'

import { AddRoomDto } from './dto/add-room.dto'
import { RegisterOwnerDto } from './dto/register-owner.dto'
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
