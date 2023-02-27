import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './interfaces/device.interface';

@Injectable()
export class DevicesService {
  constructor(
    @Inject('DEVICE_MODEL')
    private deviceModel: Model<Device>,
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    return this.deviceModel.create(createDeviceDto);
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
    return this.deviceModel.update(
      { _id: device._id },
      { $set: updateDeviceDto },
    );
  }

  async remove(id: string) {
    const device = await this.findOne(id);
    return this.deviceModel.remove({ _id: device._id });
  }
}
