import Images from './Images';
import Theme from './Theme';

interface Brand {
  id?: number;
  contextId?: number;
  images: Images;
  name: string;
  theme: Theme;
}

export default Brand;
