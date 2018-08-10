import { Unit } from '../../../unit/model';
import { ReadingType } from '../../../readingType/model';

export interface FeedManifest {
  reference: string;
  unit: Unit;
  name: string;
  maximum?: number | null;
  description: string;
  id: number;
  minimum?: number;
  readingType: ReadingType;
}
