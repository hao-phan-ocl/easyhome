import * as bcrypt from 'bcrypt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email)
    if (!user) throw new UnauthorizedException('Invalid email')

    const checkPass = await bcrypt.compare(pass, user.password)
    if (!checkPass) throw new UnauthorizedException('Invalid password')

    return user
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async googleLogin(user: any) {
    const googleUser = await this.usersService.findOrCreate(user)

    return await this.login(googleUser)
  }
}
