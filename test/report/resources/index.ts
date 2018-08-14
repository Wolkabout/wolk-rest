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
};
