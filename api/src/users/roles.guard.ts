import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Role } from './enum/role.enum'
import { ROLES_KEY } from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Reflect what role is required for this
    // Check if there is @Role decorator and what role is it of the request
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // If no role required, let the request proceeds freely
    if (!requiredRoles) {
      return true
    }

    // Authenticated user
    const { user } = context.switchToHttp().getRequest()

    return requiredRoles.some((role) => user.role?.includes(role))
  }
}
