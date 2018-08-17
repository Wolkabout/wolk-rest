import { ReportDto, ReportRange } from '../../../src/report/model';

export const humidityReport: ReportDto = {
  feedIds: [3727],
  name: 'WRT Humidity Report',
  reportRange: ReportRange.TODAY,
  readingType: {
    id: 4
  }
};
export const humidityReportFail = {
  feedIds: [3727],
  name: 'WRT Humidity Report FAIL',
  reportRange: ReportRange.TODAY,
  id:0
};

export const reportByFeeds = {
  from:1534284000000,
  to:1534370399000,
  feedIds: [3725],
};
