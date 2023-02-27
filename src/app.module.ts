import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [DevicesModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
