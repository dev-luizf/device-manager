import { Inject, Injectable } from '@nestjs/common';
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
    return `This action returns all devices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
