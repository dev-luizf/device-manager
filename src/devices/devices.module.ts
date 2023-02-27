import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DatabaseModule } from 'src/database/database.module';
import { devicesProviders } from './device.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DevicesController],
  providers: [DevicesService, ...devicesProviders]
})
export class DevicesModule {}
