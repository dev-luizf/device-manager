import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongoose';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Device } from './interfaces/device.interface';

const newDevice =   {
  name: 'dipositivo 1',
  temperature: '50°C',
  luminosity: '10lux',
  humidity: '50%',
};

const devicesList = [
  {
    ...newDevice,
    _id: '63fc13c7b817f1ef5af52631',
    _v: 0
  },
  {
    _id: '63fc13c8b817f1ef5af52633',
    name: 'dispositivo 2',
    temperature: '50°C',
    luminosity: '10lm',
    humidity: '80%',
    __v: 0,
  },
] as (Device & { _id: ObjectId; })[];

const invalidIdError = "id is invalid"
const requiredIdError = "id is required"

describe('DevicesController', () => {
  let controller: DevicesController;
  let service: DevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [{
        provide: DevicesService,
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        },
      }],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
    service = module.get<DevicesService>(DevicesService);
  });

  describe('findAll', () => {
    it('deve retornar uma lista de dispositivos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(devicesList);
      expect(await controller.findAll()).toEqual(devicesList);
    });
  });

  describe('findOne', () => {
    it('deve retornar o dispositivo especificado', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(devicesList[0]);
      expect(await controller.findOne('63fc13c7b817f1ef5af52631')).toEqual(devicesList[0]);
    });

    it('deve retornar um erro se o id não for valido', async () => {
      try {
        await controller.findOne('11111111111');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toEqual(invalidIdError);
      }
    });

    it('deve retornar um erro se o id não for informado', async () => {
      const id = undefined;
      try {
        await controller.findOne(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toEqual(requiredIdError);
      }
    });
  });

  describe('create', () => {
    it('deve criar um novo dispositivo', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(devicesList[0]);
      expect(await controller.create(newDevice)).toEqual(devicesList[0]);
    });

    it('deve retornar um erro se as informações não forem válidas', async () => {
      try {
        await controller.create({} as Device);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.error).toEqual("Bad Request");
      }
    });
  });

  describe('delete', () => {
    it('deve excluir um dispositivo existente', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ deletedCount: 1 });
      await expect(controller.remove('63fc13c7b817f1ef5af52631')).resolves.not.toThrow();
    });

    it('deve retornar um erro se o id não for valido', async () => {
      try {
        await controller.remove('11111111111');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toEqual(invalidIdError);
      }
    });

    it('deve retornar um erro se o id não for informado', async () => {
      const id = undefined;
      try {
        await controller.remove(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response.message).toEqual(requiredIdError);
      }
    });
  });

});
