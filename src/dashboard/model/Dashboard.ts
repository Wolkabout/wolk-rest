import User from '../../authentication/model/User';
import { Widget } from './Widget';
import Permission from './enumeration/Permission';
import WidgetType from './enumeration/WidgetType';

export interface Dashboard {
  creator: User;
  accessListActive: boolean;
  roleName: string;
  creatorName: string;
  name: string;
  permission: Permission;
  id: number;
  widgets: Widget[];
  type: WidgetType;
}
