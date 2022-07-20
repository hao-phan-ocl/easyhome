import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

import { AuthService } from 'src/auth/auth.service'
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard'
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

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const registeredUser = await this.usersService.registerUser(registerUserDto)
    return this.authService.login(registeredUser)
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

  // @Post('upload/:roomId')
  @Post('upload')
  @Roles(Role.USER)
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          // split() divides a string into array of substrings
          // Ex: file.originalname = profile.png
          // split('.') => ['profile', 'png']
          // file.originalname.split('.')[0] => 'profile'
          const name = file.originalname.split('.')[0]

          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9)

          const ext = extname(file.originalname)

          const filename = `${name}-${uniqueSuffix}${ext}`

          cb(null, filename)
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException(
              'Only jpg/jpeg/png image files are allowed!',
            ),
            false,
          )
        }
        callback(null, true)
      },
    }),
  )
  uploadImages(
    @UploadedFiles() images: Express.Multer.File[],
    // @Param('roomId') roomId: string,
  ) {
    console.log(images)
    return images
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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return this.usersService.getProfile(req.user.id)
  }
}
