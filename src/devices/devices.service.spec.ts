import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from './devices.service';
import { Device } from './interfaces/device.interface';
import { Model } from 'mongoose';
import { EventsGateway } from 'src/events/events.gateway';
import { NotFoundException } from '@nestjs/common';

const devicesList = [
  {
    _id: '63fc13c7b817f1ef5af52631',
    name: 'dipositivo 1',
    temperature: '50°C',
    luminosity: '10lux',
    humidity: '50%',
    __v: 0,
  },
  {
    _id: '63fc13c8b817f1ef5af52633',
    name: 'dispositivo 2',
    temperature: '50°C',
    luminosity: '10lm',
    humidity: '80%',
    __v: 0,
  },
];

const notFoundError = 'device not found';

describe('DevicesService', () => {
  let mockDeviceModel: Model<Device>;
  let devicesService: DevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        {
          provide: EventsGateway,
          useValue: {
            onNewDevice: jest.fn(),
            onUpdateDevice: jest.fn(),
          },
        },
        {
          provide: 'DEVICE_MODEL',
          useValue: {
            create: jest.fn().mockResolvedValue(devicesList[0]),
            find: () => ({
              exec: jest.fn().mockResolvedValue(devicesList),
            }),
            findById: () => ({
              exec: jest.fn().mockResolvedValue(devicesList[0]),
            }),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    mockDeviceModel = module.get<Model<Device>>('DEVICE_MODEL');
    devicesService = module.get<DevicesService>(DevicesService);
  });

  describe('create', () => {
    it('deve criar um novo dispositivo', async () => {
      const createdDevice = await devicesService.create(devicesList[0]);
      expect(createdDevice._id).toEqual(devicesList[0]._id);
    });
  });

  describe('findAll', () => {
    it('deve retornar uma lista de dispositivos', async () => {
      const list = await devicesService.findAll();
      expect(list).toEqual(devicesList);
    });
  });

  describe('findOne', () => {
    it('deve retornar um dispositivo específico', async () => {
      const device = await devicesService.findOne(devicesList[0]._id);
      expect(device).toEqual(devicesList[0]);
    });

    it('deve lançar um erro se o dispositivo não for encontrado', async () => {
      jest
        .spyOn(mockDeviceModel, 'findById')
        .mockReturnValue({ exec: () => null } as any);
      try {
        await devicesService.findOne(devicesList[0]._id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response.message).toEqual(notFoundError);
      }
    });
  });

  describe('update', () => {
    const device = devicesList[0];

    it('deve atualizar um dispositivo', async () => {
      jest.spyOn(mockDeviceModel, 'update').mockResolvedValue(null);
      await expect(devicesService.update(device._id, { name: 'novo nome' })).resolves.not.toThrow()
    });

    it('deve lançar um erro se o dispositivo não for encontrado', async () => {
      jest
        .spyOn(mockDeviceModel, 'findById')
        .mockReturnValue({ exec: () => null } as any);
      try {
        await devicesService.update(device._id, device);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response.message).toEqual(notFoundError);
      }
    });
  });

  describe('remove', () => {
    it('deve remover um dispositivo', async () => {
      jest.spyOn(mockDeviceModel, 'remove').mockResolvedValue(null);
      await expect(devicesService.remove(devicesList[0]._id)).resolves.not.toThrow()
    });

    it('deve lançar um erro se o dispositivo não for encontrado', async () => {
      jest
        .spyOn(mockDeviceModel, 'findById')
        .mockReturnValue({ exec: () => null } as any);
      try {
        await devicesService.remove(devicesList[0]._id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response.message).toEqual(notFoundError);
      }
    });
  });
});
