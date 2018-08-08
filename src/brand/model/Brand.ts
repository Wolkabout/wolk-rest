import Images from './Images';
import Theme from './Theme';

export default interface Brand {
  id?: number;
  contextId?: string;
  images: Images;
  name: string;
  theme: Theme;
}
