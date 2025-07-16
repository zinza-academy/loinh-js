import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { S3Module } from 'lib/shared/modules/s3/s3.module';

@Module({
  imports: [S3Module],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
