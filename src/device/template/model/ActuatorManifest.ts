import { Unit } from '../../../unit/model';
import { ReadingType } from '../../../readingType/model';

export interface ActuatorManifest {
  reference: string;
  unit: Unit;
  name: string;
  maximum: number;
  description: string;
  id: number;
  minimum: number;
  readingType: ReadingType;
}
