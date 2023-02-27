import { Mongoose } from 'mongoose';
import { DeviceSchema } from './device.schema';

export const devicesProviders = [
  {
    provide: 'DEVICE_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Device', DeviceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
