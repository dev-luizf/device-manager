import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DatabaseModule } from 'src/database/database.module';
import { devicesProviders } from './device.providers';
import { EventsModule } from 'src/events/events.module';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  imports: [DatabaseModule, EventsModule],
  controllers: [DevicesController],
  providers: [DevicesService, ...devicesProviders, EventsGateway],
})
export class DevicesModule {}
