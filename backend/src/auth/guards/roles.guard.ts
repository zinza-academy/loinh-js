import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'lib/shared/modules/prisma/prisma.service';
import { UserPayloadJwt } from 'lib/shared/types/jwt-payload.type';
import { ROLES_KEY } from 'lib/shared/decorators/roles.decorator';
import { UserRole } from '@enum/user.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user?.sub) {
      throw new ForbiddenException(
        "You don't have permission to access this resource",
      );
    }

    const identity = await this.prisma.identity.findUnique({
      where: { userId: user.sub },
      select: { role: true },
    });
    console.log('sfsdfls', identity);
    if (!identity) {
      throw new ForbiddenException(
        "You don't have permission to access this resource",
      );
    }

    const appRole = identity.role as unknown as UserRole;
    if (!requiredRoles.includes(appRole)) {
      throw new ForbiddenException(
        "You don't have permission to access this resource",
      );
    }
    return true;
  }
}
