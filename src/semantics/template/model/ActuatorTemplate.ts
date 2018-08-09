import { Unit } from './../../../unit/model';
import { ReadingType } from './../../../readingType/model';

export interface ActuatorTemplate {
  id?: number;
  name: string;
  unit?: Unit;
  readingType?: ReadingType;
}
