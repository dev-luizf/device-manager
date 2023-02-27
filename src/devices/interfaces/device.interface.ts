import { Document } from 'mongoose';

export interface Device extends Document {
  readonly name: string;
  readonly temperature: number;
  readonly luminosity: string;
  readonly humidity: string;
}
