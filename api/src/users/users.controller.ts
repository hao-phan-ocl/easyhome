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
import { AddRoomDto } from './dto/add-room.dto'
import { FavoriteDto } from './dto/favorite.dto'
import { PromoteUserDto } from './dto/promote-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { Role } from './enum/role.enum'
import { Roles } from './roles.decorator'
import { RolesGuard } from './roles.guard'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  @Roles(Role.ADMIN, Role.MODERATOR)
  getAll() {
    return this.usersService.getAll()
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto)
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('delete/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId)
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('add-favorite')
  @Roles(Role.USER)
  addFav(@Body() favDto: FavoriteDto) {
    const { userId, roomId } = favDto

    return this.usersService.addFav(userId, roomId)
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('remove-favorite')
  @Roles(Role.USER)
  removeFav(@Body() favDto: FavoriteDto) {
    const { userId, roomId } = favDto

    return this.usersService.removeFav(userId, roomId)
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add-room')
  @Roles(Role.USER)
  addRoom(@Body() addRoomDto: AddRoomDto) {
    return this.usersService.addRoom(addRoomDto)
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('remove-room/:roomId')
  @Roles(Role.USER)
  removeRoom(@Param('roomId') roomId: string) {
    return this.usersService.removeRoom(roomId)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('promote/:userId')
  @Roles(Role.ADMIN)
  promoteUser(
    @Body() promoteUserDto: PromoteUserDto,
    @Param('userId') userId: string,
  ) {
    return this.usersService.promoteUser(userId, promoteUserDto.role)
  }
}
