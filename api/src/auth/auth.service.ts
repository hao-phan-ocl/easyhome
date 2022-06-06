import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

import { TenantsService } from 'src/tenants/tenants.service'

@Injectable()
export class AuthService {
  constructor(
    private tenantsService: TenantsService,
    private jwtService: JwtService,
  ) {}

  async validateTenant(username: string, pass: string): Promise<any> {
    const tenant = await this.tenantsService.findOne(username)

    const checkPw = await bcrypt.compare(pass, tenant.password)

    if (tenant && checkPw) {
      return tenant
    }
    return null
  }

  async login(tenant: any) {
    const payload = { username: tenant.username, sub: tenant._id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
