import ReadingType from '../../readingType/model/ReadingType';
import Unit from '../../unit/model/Unit';

export interface Feed {
  reference: string;
  unit: Unit;
  name: string;
  maximum: number;
  description: string;
  id: number;
  minimum: number;
  readingType: ReadingType;
}
