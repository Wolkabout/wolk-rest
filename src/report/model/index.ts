import { User } from '../../authentication/model';
import { DeviceSensor } from '../../device/template/model/Feed';
import { ReadingType } from '../../readingType/model';
import { FeedTemplate } from '../../semantics/template/model';
import { Unit } from './../../unit/model/Unit';

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
  readingType?: { id: number };
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

export interface DataSnapshot {
  reports: {
    name: string,
    feedId: number,
    path: string,
    readings: {
      values: number[],
      time: number
    },
    min: {
      values: number[],
      time: number
    },
    max: {
      values: number,
      time: number
    },
    messages: ReportMessage[],
    readingType: ReadingType,
    unit: Unit,
  }[];
  interval: number;
}

export interface ReportMessage {
  severity: string;
  sourceId: number;
  path: string;
  read: boolean;
  data: string;
  sourceType: string;
  description: string;
  contextId: number;
  type: string;
  userId: number;
  timestamp: number;
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

export interface FeedReport extends FeedTemplate {
  trend: string;
  connectionState: string;
  alarmMessage: string;
  deviceName: string;
  reference: string;
  connected: boolean;
  path: string;
  alarmState: string;
  alarmLimitsPresent: boolean;
  maximum: number;
  minimum: number;
  value: string;
}
