import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [LocationModule, ConsoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
