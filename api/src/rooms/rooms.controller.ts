import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'

import { AddRoomDto } from './dto/add-room.dto'
import { RoomsService } from './rooms.service'
import { SearchDto } from './dto/search.dto'

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('all')
  getAll() {
    return this.roomsService.getAll()
  }

  @Post('add-room')
  addRoom(@Body() addRoomDto: AddRoomDto) {
    return this.roomsService.addRoom(addRoomDto)
  }

  @Delete('remove-room/:roomId')
  removeRoom(@Param('roomId') roomId: string) {
    return this.roomsService.removeRoom(roomId)
  }

  // @Get(
  //   'search/:housingType/:surface/:rent/:availableFrom/:numberOfRooms/:bathroomType/:kitchenType/:furnished',
  // )
  // search(
  //   @Param('housingType') housingType: 'shared' | 'studio' | 'apartment',
  //   @Param('surfaceMin') surfaceMin: number,
  //   @Param('surfaceMax') surfaceMax: number,
  //   @Param('rentMin') rentMin: number,
  //   @Param('rentMax') rentMax: number,
  //   @Param('availableFrom') availableFrom: Date,
  //   @Param('numberOfRooms') numberOfRooms: number,
  //   @Param('bathroomType') bathroomType: 'private' | 'shared',
  //   @Param('kitchenType')
  //   kitchenType: 'inRoom' | 'shared' | 'privateAndSeperate',
  //   @Param('furnished') furnished: boolean,
  // ) {
  //   const searchDto = {
  //     housingType,
  //     surfaceMin,
  //     surfaceMax,
  //     rentMin,
  //     rentMax,
  //     availableFrom,
  //     numberOfRooms,
  //     bathroomType,
  //     kitchenType,
  //     furnished,
  //   }
  //   return this.roomsService.search(searchDto)
  // }

  @Get('search')
  search(@Body() searchDto: Partial<SearchDto>) {
    return this.roomsService.search(searchDto)
  }
}
