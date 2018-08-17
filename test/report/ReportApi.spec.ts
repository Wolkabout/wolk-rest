import { expect } from 'chai';
import WolkREST from '../../src';
import { getAuthenticatedWolkRestInstance } from '../utils';
import * as fromModel from './../../src/report/model/';
import { HTTP_ERRORS } from './../../src/utils/HTTPErrorsEnum';
import * as fromResources from './resources';

describe('Report API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[GET] /api/reports', async () => {
    it('Should get reports list', async () => {
      const { status } = await wolkRest.report().listReports();

      expect(status).to.equal(200);
    });

    it('Should be denied access to reports list', async () => {
      try {
        await wolkRest.report().listReports();
      } catch ({ code }) {
        expect(code).to.equal(HTTP_ERRORS.FORBIDDEN);
      }
    });

    it('Should get reports by feed Ids', async () => {
      const { data: feedReports, status } =
        await wolkRest.report().getReportByFeed(fromResources.reportByFeeds);

      expect(status).to.equal(200);
      expect(feedReports[0].path).to.equals('QA Device/Temperature');
    });

    it('Should fail to get reports by feed Ids', async () => {
      try {
        await wolkRest.report().getReportByFeed();
      } catch ({ code }) {
        expect(code).to.equal(400);
      }

    });

  });

  context('[GET] /api/reports/snapshotForFeeds', async () => {
    it('Should get snapshot reports by feed Ids', async () => {
      const { data: snapshot, status } =
        await wolkRest.report().getDataSnapshot(fromResources.reportByFeeds);

      const { reports } = snapshot;

      expect(status).to.equal(200);
      expect(reports[0].path).to.equals('QA Device/Temperature');
    });
  });

  context('[GET] /api/reports/{reportId}', async () => {
    let createdReportId: number;

    before(async () => {
      const { data: reportId } = await wolkRest.report().createReport(fromResources.humidityReport);
      createdReportId = reportId;
    });

    it('Should get report by Id', async () => {
      const { data: report, status } =
        await wolkRest.report().getReport(createdReportId);

      expect(status).to.equal(200);
      expect(report.name).to.equals('WRT Humidity Report');
    });

    it('Should fail to get report by Id', async () => {
      try {
        await wolkRest.report().getReport(createdReportId);
      } catch ({ code }) {
        expect(code).to.equal(HTTP_ERRORS.NOT_FOUND);
      }

    });

    after(async () => {
      await wolkRest.report().deleteReport(createdReportId);
    });

  });

  context('[POST] /api/report', async () => {
    let createdReportId: number;
    it('Should create new Report from DTO', async () => {
      const { data: reportId, status } = await wolkRest.report().createReport(fromResources.humidityReport);

      expect(status).to.equal(201);
      createdReportId = reportId;
    });

    it('Should fail to create new Report from DTO', async () => {
      try {
        await wolkRest.report().createReport(fromResources.humidityReportFail);
      } catch ({ code }) {
        expect(code).to.equal(HTTP_ERRORS.BAD_REQUEST);
      }
    });

    after(async () => {
      await wolkRest.report().deleteReport(createdReportId);
    });

  });

  context('[DELETE] /api/report/{reportId}', async () => {
    let createdReportId: number;

    before(async () => {
      const { data: reportId } = await wolkRest.report().createReport(fromResources.humidityReport);
      createdReportId = reportId;
    });

    it('Should delete report with given ID', async () => {
      const { status } = await wolkRest.report().deleteReport(createdReportId);
      expect(status).to.equal(200);
    });

    it('Should fail to delete already deleted report', async () => {
      try {
        await wolkRest.report().deleteReport(createdReportId);
      } catch ({ code }) {
        expect(code).to.equal(404);
      }
    });
  });

  context('[PUT] /api/report/{reportId}', async () => {
    let reportToUpdate: fromModel.ReportDto;

    before(async () => {
      const { data: reportId } = await wolkRest.report().createReport(fromResources.humidityReport);
      reportToUpdate = Object.assign({}, fromResources.humidityReport, { id: reportId });
    });

    it('Should fail to UPDATE report with given ID', async () => {
      try {
        await wolkRest.report().updateReport(fromResources.humidityReportFail);
      } catch ({ code }) {
        expect(code).to.equal(HTTP_ERRORS.BAD_REQUEST);
      }
    });

    it('Should UPDATE report with given ID', async () => {
      const { status } = await wolkRest.report().updateReport(reportToUpdate);
      expect(status).to.equal(200);
    });

    after(async () => {
      await wolkRest.report().deleteReport(reportToUpdate.id!);
    });
  });

});
