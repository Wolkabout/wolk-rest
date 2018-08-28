import { WolkREST } from '../../src/wolk-rest';

import { getAuthenticatedWolkRestInstance } from '../utils';
import { HTTP_ERRORS } from './../../src/utils/HTTPErrorsEnum';

import * as fromModel from './../../src/report/model/';
import * as fromResources from './resources';

describe('Report API', () => {
  let wolkRest: WolkREST;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[GET] /api/reports', async () => {
    test('Should get reports list', async () => {
      const { status } = await wolkRest.report().listReports();

      expect(status).toEqual(200);
    });

    test('Should be denied access to reports list', async () => {
      try {
        await wolkRest.report().listReports();
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.FORBIDDEN);
      }
    });

    test('Should get reports by feed Ids', async () => {
      const { data: feedReports, status } =
        await wolkRest.report().getReportByFeed(fromResources.reportByFeeds);

      expect(status).toEqual(200);
      expect(feedReports[0].path).toEqual('QA Device/Temperature');
    });

    test('Should fail to get reports by feed Ids', async () => {
      try {
        await wolkRest.report().getReportByFeed();
      } catch ({ code }) {
        expect(code).toEqual(400);
      }

    });

  });

  describe('[GET] /api/reports/snapshotForFeeds', async () => {
    test('Should get snapshot reports by feed Ids', async () => {
      const { data: snapshot, status } =
        await wolkRest.report().getDataSnapshot(fromResources.reportByFeeds);

      const { reports } = snapshot;

      expect(status).toEqual(200);
      expect(reports[0].path).toEqual('QA Device/Temperature');
    });
  });

  describe('[GET] /api/reports/{reportId}', async () => {
    let createdReportId: number;

    beforeAll(async () => {
      const { data: reportId } = await wolkRest.report().createReport(fromResources.humidityReport);
      createdReportId = reportId;
    });

    test('Should get report by Id', async () => {
      const { data: report, status } =
        await wolkRest.report().getReport(createdReportId);

      expect(status).toEqual(200);
      expect(report.name).toEqual('WRT Humidity Report');
    });

    test('Should fail to get report by Id', async () => {
      try {
        await wolkRest.report().getReport(createdReportId);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }

    });

    afterAll(async () => {
      await wolkRest.report().deleteReport(createdReportId);
    });
  });

  describe('[POST] /api/report', async () => {
    let createdReportId: number;
    test('Should create new Report from DTO', async () => {
      const { data: reportId, status } = await wolkRest.report().createReport(fromResources.humidityReport);

      expect(status).toEqual(201);
      createdReportId = reportId;
    });

    test('Should fail to create new Report from DTO', async () => {
      try {
        await wolkRest.report().createReport(fromResources.humidityReportFail);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.BAD_REQUEST);
      }
    });

    afterAll(async () => {
      await wolkRest.report().deleteReport(createdReportId);
    });
  });

  describe('[DELETE] /api/report/{reportId}', async () => {
    let createdReportId: number;

    beforeAll(async () => {
      const { data: reportId } = await wolkRest.report().createReport(fromResources.humidityReport);
      createdReportId = reportId;
    });

    test('Should delete report with given ID', async () => {
      const { status } = await wolkRest.report().deleteReport(createdReportId);

      expect(status).toEqual(200);
    });

    test('Should fail to delete already deleted report', async () => {
      try {
        await wolkRest.report().deleteReport(createdReportId);
      } catch ({ code }) {
        expect(code).toEqual(404);
      }
    });
  });

  describe('[PUT] /api/report/{reportId}', async () => {
    let reportToUpdate: fromModel.ReportDto;

    beforeAll(async () => {
      const { data: reportId } = await wolkRest.report().createReport(fromResources.humidityReport);
      reportToUpdate = Object.assign({}, fromResources.humidityReport, { id: reportId });
    });

    test('Should fail to UPDATE report with given ID', async () => {
      try {
        await wolkRest.report().updateReport(fromResources.humidityReportFail);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.BAD_REQUEST);
      }
    });

    test('Should UPDATE report with given ID', async () => {
      const { status } = await wolkRest.report().updateReport(reportToUpdate);
      expect(status).toEqual(200);
    });

    afterAll(async () => {
      await wolkRest.report().deleteReport(reportToUpdate.id!);
    });
  });

  describe('[GET] /api/report/{reportId}/feeds', async () => {
    let createdReportId: number;

    beforeAll(async () => {
      const { data: reportId } = await wolkRest.report().createReport(fromResources.humidityReport);
      createdReportId = reportId;
    });

    test('Should GET report feeds with given ID', async () => {
      const { status } = await wolkRest.report().listReportFeeds(createdReportId);

      expect(status).toEqual(200);
    });

    afterAll(async () => {
      await wolkRest.report().deleteReport(createdReportId);
    });

    test('Should fail to GET report feeds with given ID', async () => {
      try {
        await wolkRest.report().listReportFeeds(createdReportId);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }
    });
  });

  describe('[POST] /api/report/{reportId}/feeds', async () => {
    let createdReportId: number;

    beforeAll(async () => {
      const { data: reportId } = await wolkRest.report().createReport(fromResources.humidityReport);
      createdReportId = reportId;
    });

    test('Should CREATE report feed with given ID', async () => {
      const { status } = await wolkRest.report().createReportFeed(createdReportId, [fromResources.feedIdForReport]);

      expect(status).toEqual(201);
    });

    afterAll(async () => {
      await wolkRest.report().deleteReport(createdReportId);
    });
  });

  describe('[DELETE] /api/report/{reportId}/feeds', async () => {
    let createdReportId: number;

    beforeAll(async () => {
      const { data: reportId } = await wolkRest.report().createReport(fromResources.humidityReport);
      createdReportId = reportId;
      await wolkRest.report().createReportFeed(createdReportId, [fromResources.feedIdForReport]);
    });

    test('Should DELETE report feed with given ID', async () => {
      const { status } = await wolkRest.report().deleteReportFeed(createdReportId, fromResources.feedIdForReport);

      expect(status).toEqual(200);
    });

    afterAll(async () => {
      await wolkRest.report().deleteReport(createdReportId);
    });

    test('Should fail to DELETE report feed with given ID', async () => {
      try {
        await wolkRest.report().deleteReportFeed(createdReportId, fromResources.feedIdForReport);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }
    });
  });

  describe('[GET] /api/reports/{reportId}/snapshotFromTo', async () => {
    let createdReportId: number;

    beforeAll(async () => {
      const { data: reportId } = await wolkRest.report().createReport(fromResources.humidityReport);
      createdReportId = reportId;
    });

    test('Should get feed snapshot by feed Ids', async () => {
      const { status } =
        await wolkRest.report().getDataSnapshotForFeeds(createdReportId, fromResources.reportByFeeds);

      expect(status).toEqual(200);
    });

    afterAll(async () => {
      await wolkRest.report().deleteReport(createdReportId);
    });

    test('Should get fail to get snapshot by feed Ids', async () => {
      try {
        await wolkRest.report().getDataSnapshotForFeeds(createdReportId, fromResources.reportByFeeds);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }
    });
  });
});
