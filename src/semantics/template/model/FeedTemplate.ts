import Unit from '../../../unit/model/Unit';
import ReadingType from '../../../readingType/model/ReadingType';

interface FeedTemplate {
  unit?: Unit;
  name: string;
  id?: number;
  readingType?: ReadingType;
}

export default FeedTemplate;
