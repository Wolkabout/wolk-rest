import Unit from '../../../unit/model/Unit';
import ReadingType from '../../../readingType/model/ReadingType';

interface ActuatorTemplate {
  id?: number;
  name: string;
  unit?: Unit;
  readingType?: ReadingType;
}

export default ActuatorTemplate;
