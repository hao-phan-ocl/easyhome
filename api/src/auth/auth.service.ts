import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { TenantsService } from 'src/tenants/tenants.service'

@Injectable()
export class AuthService {
  constructor(private tenantsService: TenantsService) {}

  async validateTenant(username: string, pass: string): Promise<any> {
    const tenant = await this.tenantsService.findOne(username)

    const checkPw = await bcrypt.compare(pass, tenant.password)

    if (tenant && checkPw) {
      return tenant
    }
    return null
  }
}
