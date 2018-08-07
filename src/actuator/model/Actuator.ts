import Unit from '../../unit/model/Unit';
import ReadingType from '../../readingType/model/ReadingType';

export interface Actuator {
  reference: string;
  unit: Unit;
  name: string;
  maximum: number;
  description: string;
  id: number;
  minimum: number;
  readingType: ReadingType;
}
