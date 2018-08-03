import DataType from './enumeration/DataType';
import Unit from '../../unit/model/Unit';

interface ReadingType {
  image: string;
  fileName: string;
  dataType: DataType;
  precision: number;
  aggregatable: boolean;
  units: Unit[];
  defaultUnit?: Unit;
  labels: string;
  size: number;
  inUse: boolean;
  name: string;
  id?: number;
}

export default ReadingType;
