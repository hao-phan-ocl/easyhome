import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { TenantsService } from 'src/tenants/tenants.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private tenantsService: TenantsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET', // move to env
    })
  }

  async validate(payload: any) {
    const tenant = await this.tenantsService.findById(payload.sub)
    return tenant // this will be returned as req.user by passportjs
  }
}
