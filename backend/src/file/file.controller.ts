import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { S3Service } from 'lib/shared/modules/s3/s3.service';

@Controller('files')
export class FileController {
  constructor(private readonly s3Service: S3Service) {}

  @Get(':bucket/:userId/:folder/:filename')
  async getFile(
    @Param('bucket') bucket: string,
    @Param('userId') userId: string,
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    try {
      const key = `${userId}/${folder}/${filename}`;

      const presignedUrl = await this.s3Service.getPresignedUrl(
        bucket,
        key,
        3600,
      );
      res.redirect(presignedUrl);
    } catch (error) {
      console.error('Error getting file:', error);
      res.status(404).json({ error: 'File not found' });
    }
  }
}
