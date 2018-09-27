import { Unit } from '../../unit/model';
import { DataType } from './enumeration/DataType';

export interface ReadingType {
  image?: string;
  fileName?: string;
  dataType: DataType;
  precision: number;
  aggregatable?: boolean;
  units?: Unit[];
  defaultUnit?: Unit;
  labels: string[] | null;
  size: number;
  inUse?: boolean;
  name: string;
  id?: number;
  iconName?: string;
}

export * from '../../unit/model';
