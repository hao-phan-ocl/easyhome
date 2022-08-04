import { Body, Controller, Get, Param } from '@nestjs/common'

import { RoomsService } from './rooms.service'
import { SearchDto } from './dto/search.dto'

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('all')
  getAll() {
    return this.roomsService.getAll()
  }

  @Get('single/:roomId')
  fetchRoom(@Param('roomId') roomId: string) {
    return this.roomsService.fetchRoom(roomId)
  }

  @Get('search')
  search(@Body() searchDto: Partial<SearchDto>) {
    return this.roomsService.search(searchDto)
  }
}
