import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BUCKET_NAME } from 'lib/shared/constants/bucket-name';
import { S3Service } from 'lib/shared/modules/s3/s3.service';

@Controller('files')
export class FileController {
  constructor(private readonly s3Service: S3Service) {}

  @Get('avatars/:fileName')
  async getAvatar(@Param('fileName') fileName: string, @Res() res: Response) {
    try {
      const presignedUrl = await this.s3Service.getPresignedUrl(
        BUCKET_NAME.USER_AVATARS,
        fileName,
        3600,
      );
      res.redirect(presignedUrl);
    } catch (error) {
      res.status(404).json({ error: 'Avatar not found' });
    }
  }
}
