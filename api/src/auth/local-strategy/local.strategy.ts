import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' })
  }

  async validate(email: string, password: string): Promise<any> {
    const tenant = await this.authService.validateUser(email, password)
    const owner = await this.authService.validateUser(email, password)

    if (tenant) {
      return tenant // this will be returned as req.user by passportjs
    } else if (owner) {
      return owner // this will be returned as req.user by passportjs
    } else throw new UnauthorizedException('Invalid email or password')
  }
}
