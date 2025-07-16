import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { S3Module } from 'lib/shared/modules/s3/s3.module';

@Module({
  imports: [S3Module],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService], // Exporting the service to be used in other modules
})
export class UploadModule {}
