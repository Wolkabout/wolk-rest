import { WidgetItem } from './WidgetItem';

export interface Widget {
  col: number;
  sizeX: number;
  sizeY: number;
  mobileReady: boolean;
  name: string;
  extras?: object;
  row: number;
  id?: number;
  type: string;
  items: WidgetItem[];
}
