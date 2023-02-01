import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

import { EnvService } from 'environment/environment.service';
import { UsersService } from 'features/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService,
    private readonly envService: EnvService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles && roles.includes('all')) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    if (!headers) {
      return false;
    }

    const auth = headers.authentication || headers.authorization;
    if (!auth) {
      return false;
    }

    const [key, token] = auth.split(' ');

    if (key !== 'Bearer' || !token || token === 'null') {
      return false;
    }

    try {
      const payload = jwt.verify(
        token,
        this.envService.get().jwtSigningKey,
      ) as jwt.JwtPayload;

      if (!payload) {
        return false;
      }

      const user = await this.userService.getUserByEmail(payload.email);
      if (!user) {
        return false;
      }

      if (roles && roles.length > 0 && !roles.includes('all')) {
        if (!roles.includes(user.role)) {
          return false;
        }
      }

      request.principal = user;

      return true;
    } catch {
      return false;
    }
  }
}
