import { Images } from './Images';
import { Theme } from './Theme';

export interface Brand {
  id?: number;
  contextId?: string;
  images: Images;
  name: string;
  theme: Theme;
}
