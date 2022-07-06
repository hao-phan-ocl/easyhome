import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { TenantsService } from 'src/tenants/tenants.service'
import { OwnersService } from 'src/owners/owners.service'

@Injectable()
export class AuthService {
  constructor(
    private tenantsService: TenantsService,
    private ownersService: OwnersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const tenant = await this.tenantsService.findOne(email)
    if (tenant) {
      const checkTenantPw = await bcrypt.compare(pass, tenant.password)

      if (checkTenantPw) {
        return tenant
      }
    }

    const owner = await this.ownersService.findOne(email)
    if (owner) {
      const checkOwnerPw = await bcrypt.compare(pass, owner.password)

      if (checkOwnerPw) {
        return owner
      }
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
