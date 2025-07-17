import { Injectable } from '@nestjs/common';
import { S3Service } from 'lib/shared/modules/s3/s3.service';
import { v4 as uuid } from 'uuid';
@Injectable()
export class UploadService {
  constructor(private s3Service: S3Service) {}

  uploadFile(file: Express.Multer.File, userId: string) {
    const fileName = uuid();
    const bucketName = `user`;
    const key = `${userId}/avatar/${fileName}`;

    return this.s3Service.uploadFile(
      bucketName,
      key,
      file.buffer,
      file.mimetype,
    );
  }
}
