import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'lib/shared/modules/prisma/prisma.module';
import { UserModule } from '@/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { env } from 'config/envConfig';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, UserModule,PassportModule.register({ defaultStrategy: 'oidc' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: env.jwt.JWT_ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: env.jwt.JWT_ACCESS_TOKEN_EXPIRE,
        },
      }),
    }),],
  controllers: [AuthController],
  providers: [AuthService, JwtService,    LocalStrategy,
    JwtStrategy,],
})
export class AuthModule {}
