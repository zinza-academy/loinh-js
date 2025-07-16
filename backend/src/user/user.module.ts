import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'lib/shared/modules/prisma/prisma.module';
import { UploadModule } from '@/upload/upload.module';
import { S3Module } from 'lib/shared/modules/s3/s3.module';

@Module({
  imports: [PrismaModule, UploadModule, S3Module],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
