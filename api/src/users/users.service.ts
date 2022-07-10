import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { RoomDocument } from 'src/rooms/room.schema'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserDocument } from './user.schema'
import { AddRoomDto } from './dto/add-room.dto'
import { Role } from './enum/role.enum'

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

    return foundUser
  }

  // GET one user
  async findOne(email: string): Promise<UserDocument | undefined> {
    return await this.userModel.findOne({ email: email })
  }

  // GET user by email
  async findByEmail(email: string): Promise<UserDocument | undefined> {
    return await this.userModel.findOne({ email: email })
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
  async deleteUser(userId: string) {
    const foundUser = await this.userModel.findByIdAndDelete(userId)

    if (!foundUser) {
      throw new NotFoundException('User not found')
    }

    // Also delete rooms of deleted user
    foundUser.properties.forEach(
      async (roomId) => await this.roomModel.findByIdAndDelete(roomId),
    )

    // const foundUser = await this.userModel.findById(userId)

    // if (!foundUser) {
    //   throw new NotFoundException('User not found')
    // }

    // foundUser.isDeleted = true
    // foundUser.save()

    // // Also delete rooms of deleted user
    // foundUser.properties.forEach(
    //   async (roomId) =>
    //     await this.roomModel.findByIdAndUpdate(
    //       roomId,
    //       { isDeleted: true },
    //       { new: true },
    //     ),
    // )

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

    const updatedFavLists = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: { favLists: roomId },
      },
      { new: true },
    )

    return updatedFavLists
  }

  // REMOVE favorite
  async removeFav(userId: string, roomId: string) {
    const foundUser = await this.userModel.findById(userId)
    // const foundRoom = await this.roomModel.findById(roomId)

    if (!foundUser) {
      throw new NotFoundException('User not found')
    }

    // if (!foundRoom) {
    //   throw new NotFoundException('Room not found')
    // }

    const updatedFavLists = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { favLists: roomId },
      },
      { new: true },
    )

    return updatedFavLists
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
    await this.userModel.findByIdAndUpdate(addedRoom.owner, {
      $push: { properties: addedRoom._id },
    })

    return addedRoom
  }

  // REMOVE room
  async removeRoom(roomId: string) {
    const foundRoom = await this.roomModel.findByIdAndDelete(roomId)

    if (!foundRoom) {
      throw new NotFoundException('Room not found')
    }

    // Remove addedRoom id to the referenced owner
    await this.userModel.findByIdAndUpdate(foundRoom.owner, {
      $pull: { properties: roomId },
    })

    return 'Room removed successfully'
  }

  // PROMOTE user
  async promoteUser(userId: string, role: string) {
    const foundUser = await this.userModel.findById(userId)

    if (!foundUser) {
      throw new NotFoundException('User not found')
    }

    foundUser.role = role

    return foundUser.save()
  }
}
