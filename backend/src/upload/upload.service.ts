import { Injectable } from '@nestjs/common';
import { S3Service } from 'lib/shared/modules/s3/s3.service';

@Injectable()
export class UploadService {
  constructor(private s3Service: S3Service) {}

  uploadFile(file: Express.Multer.File, userId: string) {
    const fileName = `${Date.now()}-${file.originalname}`;
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
