import { expect } from 'chai';
import WolkREST from '../../src';
import { getAuthenticatedWolkRestInstance } from '../utils';
import { HTTP_ERRORS } from './../../src/utils/HTTPErrorsEnum';
import * as fromResources from './resources';

describe('Report API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
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
});
