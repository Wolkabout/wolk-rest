import { User } from '../../authentication/model';
import { DeviceSensor } from '../../device/template/model/Feed';

export interface ReportDto {
  settings?: string;
  creator?: User;
  accessListActive?: boolean;
  reportRange: ReportRange;
  feedIds: number[];
  creatorName?: string;
  permission?: AccessPermission;
  roleName?: string;
  name: string;
  feeds?: DeviceSensor[];
  readingType?: {id: number};
  id?: number;
}

export interface ReportShortDto {
  reportRange: ReportRange;
  name: string;
  contextId: number;
  id: number;
  readingType: {
    name: string,
    id: number
  };
}

export interface FeedReport {
  feedId: number;
  labels: string[];
  path: string;
  readings: object[];
}

export enum ReportRange {
  TODAY,
  YESTERDAY,
  THIS_WEEK,
  LAST_WEEK,
  THIS_MONTH,
  LAST_MONTH
}

export enum AccessPermission {
  READ_ONLY,
  READ_WRITE
}
