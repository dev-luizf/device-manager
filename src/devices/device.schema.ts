import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema({
  name: String,
  temperature: String,
  luminosity: String,
  humidity: String,
});
