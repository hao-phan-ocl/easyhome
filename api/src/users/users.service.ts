import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import * as fs from 'fs'

import { RoomDocument } from 'src/rooms/room.schema'
import { UserDocument } from './user.schema'
import { AddRoomDto } from './dto/add-room.dto'
import { Role } from './enum/role.enum'
import { RegisterUserDto } from 'src/users/dto/register-user.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Room') private roomModel: Model<RoomDocument>,
  ) {}

  // GET all users
  async getAll(): Promise<UserDocument[]> {
    return await this.userModel.find()
  }

  // GET profile
  async getProfile(userId: string) {
    const foundUser = await this.userModel.findById(userId)

    if (!foundUser) {
      throw new NotFoundException('User not found')
    }

    // Clear favLists for rooms that have been deleted from other owners
    foundUser.favLists.forEach(async (roomId) => {
      const foundRoom = await this.roomModel.findById(roomId)
      if (foundRoom === null) {
        await foundUser.updateOne(
          {
            $pull: { favLists: roomId },
          },
          { new: true },
        )
      }
    })

    return foundUser.populate(['favLists', 'properties'])
  }

  // GET one user
  async findOne(email: string): Promise<UserDocument | undefined> {
    return await this.userModel.findOne({ email: email })
  }

  // GET user by email
  async findByEmail(email: string): Promise<UserDocument | undefined> {
    return await this.userModel.findOne({ email: email })
  }

  // Find or create
  async findOrCreate(user: any) {
    const { email, firstName, lastName } = user

    const foundUser = await this.userModel.findOne({ email: email })

    if (!foundUser) {
      const newUser = await this.userModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
      })
      return newUser
    }

    return foundUser
  }

  // Register user
  async registerUser(registerUserDto: RegisterUserDto): Promise<UserDocument> {
    const existedUser = await this.userModel.findOne({
      email: registerUserDto.email,
    })

    if (existedUser) {
      throw new ConflictException(
        'An account already exists with that email address',
      )
    }

    // Hasing password with bcrypt
    const salt = await bcrypt.genSalt(10)
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, salt)

    // Check if it is admin account
    if (registerUserDto.email === 'admin@gmail.com') {
      registerUserDto.role = Role.ADMIN
    }

    return await this.userModel.create(registerUserDto)
  }

  // DELETE user
  async deleteUser(toBeDeletedUserId: string, currentUser: UserDocument) {
    const foundUser = await this.userModel.findById(toBeDeletedUserId)

    if (!foundUser) {
      throw new NotFoundException('User not found')
    }

    if (foundUser.role === 'ADMIN') {
      throw new BadRequestException('Admin cannot be removed')
    }

    if (
      foundUser.role === 'MODERATOR' &&
      currentUser.role === 'MODERATOR' &&
      foundUser.id !== currentUser.id
    ) {
      throw new UnauthorizedException('MODERATOR can only remove USER')
    }

    // Also delete rooms & its photo (if any) of deleted user
    foundUser.properties.forEach(async (roomId) => {
      const foundRoom = await this.roomModel.findByIdAndDelete(roomId)

      if (foundRoom.images.length) {
        foundRoom.images.forEach((img) => {
          const existedImageName = img.split('/users/image/')[1]

          const fileDir = `./upload/${existedImageName}`
          fs.unlink(fileDir, (err) => {
            if (err)
              throw new InternalServerErrorException(
                "Couldn't delete this file",
              )
          })
        })
      }
    })

    // Delete avatar from server
    if (foundUser.avatar) {
      const existedImageName = foundUser.avatar.split('/users/image/')[1]

      const fileDir = `./upload/${existedImageName}`
      fs.unlink(fileDir, (err) => {
        if (err)
          throw new InternalServerErrorException("Couldn't delete this file")
      })
    }

    await foundUser.deleteOne()
    return 'User deleted successfully'
  }

  // ADD favorite
  async addFav(userId: string, roomId: string) {
    const foundUser = await this.userModel.findById(userId)
    const foundRoom = await this.roomModel.findById(roomId)

    if (!foundUser) {
      throw new NotFoundException('User not found')
    }

    if (!foundRoom) {
      throw new NotFoundException('Room not found')
    }

    const existed = await this.userModel.exists({
      _id: userId,
      favLists: roomId,
    })

    if (existed) {
      throw new InternalServerErrorException('Room already added')
    }

    const updatedFavLists = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $push: { favLists: roomId },
        },
        { new: true },
      )
      .populate('favLists')

    return updatedFavLists
  }

  // REMOVE favorite
  async removeFav(userId: string, roomId: string) {
    const foundUser = await this.userModel.findById(userId)

    if (!foundUser) {
      throw new NotFoundException('User not found')
    }

    const updatedFavLists = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $pull: { favLists: roomId },
        },
        { new: true },
      )
      .populate('favLists')

    return updatedFavLists
  }

  // UPDATE user
  async updateUser(userId: string, update: UpdateProfileDto) {
    const foundUser = await this.userModel.findByIdAndUpdate(userId, update, {
      new: true,
    })

    if (!foundUser) throw new NotFoundException('User not found')

    return foundUser
  }

  // UPLOAD avatar
  async uploadAvatar(userId: string, avatar: Express.Multer.File) {
    const foundUser = await this.userModel.findById(userId)
    const imgPath = `localhost:5000/users/image/${avatar.filename}`

    // Delete existed avatar from server
    if (foundUser.avatar) {
      const existedImageName = foundUser.avatar.split('/users/image/')[1]

      const fileDir = `./upload/${existedImageName}`
      fs.unlink(fileDir, (err) => {
        if (err)
          throw new InternalServerErrorException("Couldn't delete this file")
      })
    }

    // Save new avatar
    foundUser.avatar = imgPath
    foundUser.save()
    return foundUser
  }

  // UPLOAD room images
  async uploadRoomImages(roomId: string, images: Express.Multer.File[]) {
    const imagePaths: string[] = []

    images.forEach((img) =>
      imagePaths.push(`localhost:5000/users/image/${img.filename}`),
    )

    const foundRoom = await this.roomModel.findByIdAndUpdate(
      roomId,
      {
        $push: { images: imagePaths },
      },
      { new: true },
    )

    if (!foundRoom) throw new NotFoundException('Room not found')

    return foundRoom
  }

  // DELETE images
  async deleteRoomImage(imagePath: string, roomId: string) {
    const foundRoom = await this.roomModel.findByIdAndUpdate(
      roomId,
      {
        $pull: { images: imagePath },
      },
      { new: true },
    )

    if (!foundRoom) throw new NotFoundException('Room not found')

    // remove image from server's folder as well
    const fileDir = `./upload/${imagePath}`
    fs.unlink(fileDir, (err) => {
      if (err)
        throw new InternalServerErrorException("Couldn't delete this file")
    })

    return foundRoom
  }

  // ADD new room
  async addRoom(addRoomDto: AddRoomDto): Promise<RoomDocument> {
    const { owner } = addRoomDto

    const foundOwner = await this.userModel.findById(owner)

    if (!foundOwner) {
      throw new NotFoundException('Owner not found')
    }

    const addedRoom = await this.roomModel.create(addRoomDto)

    // Add addedRoom id to the referenced owner
    await this.userModel.findByIdAndUpdate(
      addedRoom.owner,
      {
        $push: { properties: addedRoom._id },
      },
      { new: true },
    )

    return addedRoom
  }

  // REMOVE room
  async removeRoom(roomId: string) {
    const foundRoom = await this.roomModel.findByIdAndDelete(roomId)

    if (!foundRoom) {
      throw new NotFoundException('Room not found')
    }

    // Remove stored images from server
    if (foundRoom.images.length) {
      foundRoom.images.forEach((img) => {
        const imgName = img.split('/users/image/')[1]
        const fileDir = `./upload/${imgName}`
        fs.unlink(fileDir, (err) => {
          if (err)
            throw new InternalServerErrorException("Couldn't delete this file")
        })
      })
    }

    // Remove addedRoom id to the referenced owner
    await this.userModel.findByIdAndUpdate(
      foundRoom.owner,
      {
        $pull: { properties: roomId },
      },
      { new: true },
    )

    return 'Room removed successfully'
  }

  // SET ROLE user
  async setRole(userId: string, role: string) {
    const foundUser = await this.userModel.findById(userId)

    if (!foundUser) {
      throw new NotFoundException('User not found')
    }

    foundUser.role = role

    return foundUser.save()
  }
}
