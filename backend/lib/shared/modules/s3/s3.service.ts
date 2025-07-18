import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  HeadBucketCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from 'config/envConfig';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly s3Client2: S3Client;
  constructor() {
    this.s3Client = new S3Client({
      endpoint: env.minio.endPoint,
      region: 'us-east-1',
      credentials: {
        accessKeyId: env.minio.accessKey,
        secretAccessKey: env.minio.secretKey,
      },
      forcePathStyle: true,
    });
    this.s3Client2 = new S3Client({
      endpoint: env.minio.minioExternalEndpoint,
      region: 'us-east-1',
      credentials: {
        accessKeyId: env.minio.accessKey,
        secretAccessKey: env.minio.secretKey,
      },
      forcePathStyle: true,
    });
  }

  async ensureBucketExists(bucketName: string): Promise<void> {
    try {
      await this.s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
    } catch (error) {
      if (error.name === 'NotFound') {
        await this.s3Client.send(
          new CreateBucketCommand({ Bucket: bucketName }),
        );
      } else {
        throw error;
      }
    }
  }

  async uploadFile(
    bucket: string,
    key: string,
    body: Buffer,
    contentType: string,
  ): Promise<string> {
    // Ensure bucket exists
    await this.ensureBucketExists(bucket);

    const params = {
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      return key;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async getPresignedUrl(
    bucket: string,
    key: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    return await getSignedUrl(this.s3Client2, command, { expiresIn });
  }

  async deleteFile(bucket: string, key: string): Promise<void> {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(params));
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
}
