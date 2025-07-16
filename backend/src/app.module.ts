import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { ConsoleModule } from 'nestjs-console';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VaccinationSiteModule } from './vaccination-site/vaccination-site.module';
import { VaccinationRegistrationModule } from './vaccination-registration/vaccination-registration.module';
import { UploadModule } from './upload/upload.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    LocationModule,
    ConsoleModule,
    UserModule,
    AuthModule,
    VaccinationSiteModule,
    VaccinationRegistrationModule,
    UploadModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
