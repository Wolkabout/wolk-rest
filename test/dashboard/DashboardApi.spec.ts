import { expect } from 'chai';
import { WolkREST } from '../../src/wolk-rest';
import { getAuthenticatedWolkRestInstance } from '../utils';
import * as fromResources from './resources';

describe('Dashboard API', () => {
  let wolkRest: WolkREST;
  let newDashboardId: number;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[GET] /api/dashboards/list', async () => {
    it('Should get dashboard list', async () => {
      const { status } = await wolkRest.dashboard().list();

      expect(status).to.be.equal(200);
    });
  });

  /**
   * Backend failing ATM - Bug reported, and scheduled for bugfix 18.06.3
   */
  // context('[GET] /api/dashboard/listLight', async () => {
  //   it('Should get dashboard list ligth', async () => {
  //     const { status } = await wolkRest.dashboard().listLight();

  //     expect(status).to.be.equal(200);
  //   });
  // });

  context('[POST] /api/dashboards/', async () => {
    it('Should create new dashboard', async () => {
      const { data: id, status } = await wolkRest.dashboard().create(
        fromResources.dashboardName
      );
      newDashboardId = id;
      expect(status).to.be.equal(201);
    });
  });

  context('[GET] /api/dashboards/{dashboardId}', async () => {
    it('Should get dashboard details', async () => {
      const { data: dashboard, status } = await wolkRest.dashboard().read(newDashboardId);
      expect(dashboard).to.deep.include(fromResources.dashboardName);
      expect(status).to.be.equal(200);
    });
  });

  context('[PUT] /api/dashboards/{dashboardId}', async () => {
    it('Should UPDATE dashboard details', async () => {
      const updatedNameDto = `${fromResources.dashboardName.name}[UPDATED]`;
      const { status } = await wolkRest.dashboard()
      .update(newDashboardId,
        updatedNameDto
      );
      const { data: updatedDashboard } = await wolkRest.dashboard().read(newDashboardId);
      expect(updatedDashboard.name).to.equals(updatedNameDto);
      expect(status).to.be.equal(200);
    });
  });

  context('[DELETE] /api/dashboards/{id}', async () => {
    it('Should DELETE dashboard', async () => {
      const { status } = await wolkRest.dashboard()
        .delete(newDashboardId);
      expect(status).to.be.equal(200);
    });
  });

  context('[DELETE] /api/dashboards/{id}', async () => {
    it('Should fail to DELETE dashboard', async () => {
      try {
        await wolkRest.dashboard()
          .delete(newDashboardId);
      } catch ({ code }) {
        expect(code).to.be.equal(404);
      }
    });
  });

});
