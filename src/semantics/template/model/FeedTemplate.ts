import { ReadingType } from './../../../readingType/model';
import { Unit } from './../../../unit/model';

export interface FeedTemplate {
  unit?: Unit;
  name: string;
  id?: number;
  readingType?: ReadingType;
}
