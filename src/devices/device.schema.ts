import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  luminosity: String,
  humidity: String,
});
