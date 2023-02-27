import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './interfaces/device.interface';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class DevicesService {
  constructor(
    @Inject('DEVICE_MODEL')
    private deviceModel: Model<Device>,
    private eventsGateway: EventsGateway,
  ) {}

  async create(createDeviceDto: CreateDeviceDto) {
    const newDevice = await this.deviceModel.create(createDeviceDto);
    this.eventsGateway.onNewDevice(newDevice);
    return newDevice;
  }

  findAll() {
    return this.deviceModel.find().exec();
  }

  async findOne(id: string) {
    const device = await this.deviceModel.findById(id).exec();
    if (!device) throw new NotFoundException('device not found');
    return device;
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.findOne(id);
    await this.deviceModel.update(
      { _id: device._id },
      { $set: updateDeviceDto },
    );
    this.eventsGateway.onUpdateDevice(updateDeviceDto);
  }

  async remove(id: string) {
    const device = await this.findOne(id);
    return this.deviceModel.remove({ _id: device._id });
  }
}
