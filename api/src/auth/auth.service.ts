import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from 'src/users/users.service'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email)
    const checkPass = await bcrypt.compare(pass, user.password)

    if (user && checkPass) {
      return user
    }

    return null
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async googleLogin(user: any) {
    const googleUser = await this.usersService.findOrCreate(user)
    console.log(googleUser)
    return await this.login(googleUser)
  }
}
