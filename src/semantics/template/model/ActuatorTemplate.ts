import { ReadingType } from '../../../readingType/model';
import { Unit } from '../../../unit/model';

export interface ActuatorTemplate {
  id?: number;
  name: string;
  unit?: Unit;
  readingType?: ReadingType;
}
