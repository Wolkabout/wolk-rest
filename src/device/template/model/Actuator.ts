import { ReadingType } from '../../../readingType/model';
import { Unit } from '../../../unit/model';

export interface ActuatorManifest {
  reference: string;
  unit: Unit;
  name: string;
  maximum: number | null;
  description: string;
  id: number;
  minimum: number | null;
  readingType: ReadingType;
}

export interface DeviceActuator {
  connectionState: string;
  connected: boolean;
  deviceName: string;
  id: number;
  maximum: number;
  minimum: number;
  name: string;
  path: string;
  readingType: ReadingType;
  reference: string;
  state: string;
  unit: Unit;
  value: string;
}
