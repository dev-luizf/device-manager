import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { joiCreateDeviceSchema, joiUpdateDeviceSchema } from 'src/joi_schemas/device.joischema';
import { joiValidate } from 'src/utils/joiValidate';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}
  
  validateId(id: string) {
    if (!id) throw new BadRequestException('id is required');
    if (id.length !== 24) throw new BadRequestException('id is invalid');
  }

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    joiValidate(joiCreateDeviceSchema, createDeviceDto)
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validateId(id);
    return this.devicesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    this.validateId(id);
    joiValidate(joiUpdateDeviceSchema, updateDeviceDto)
    await this.devicesService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.validateId(id);
    await this.devicesService.remove(id);
  }
}
