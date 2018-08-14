import { ReadingType } from '../../../readingType/model';
import { Unit } from '../../../unit/model';

export interface FeedManifest {
  reference: string;
  unit: Unit;
  name: string;
  description: string;
  id: number;
  maximum?: number | null;
  minimum?: number;
  readingType: ReadingType;
}

export interface DeviceSensor {
  alarmLimitsPresent: boolean;
  alarmMessage: string | null;
  alarmState: string;
  connected: boolean;
  connectionState: string;
  device: {
    id: number;
    name: string;
  };
  deviceName: string;
  id: number;
  lastUpdate: number | null;
  maximum?: number | null;
  minimum?: number;
  message: string;
  name: string;
  options: string | null;
  path: string;
  readingType: ReadingType;
  reference: string;
  trend: string;
  Unit: Unit;
  value: number | null;
}
