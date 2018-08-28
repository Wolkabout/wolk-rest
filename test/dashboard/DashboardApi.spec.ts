import { WolkREST } from '../../src/wolk-rest';
import { getAuthenticatedWolkRestInstance } from '../utils';
import * as fromResources from './resources';

describe('Dashboard API', () => {
  let wolkRest: WolkREST;
  let newDashboardId: number;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[GET] /api/dashboards/list', async () => {
    test('Should get dashboard list', async () => {
      const { status } = await wolkRest.dashboard().list();

      expect(status).toEqual(200);
    });
  });

  /**
   * Backend failing ATM - Bug reported, and scheduled for bugfix 18.06.3
   */
  // describe('[GET] /api/dashboard/listLight', async () => {
  //   test('Should get dashboard list ligth', async () => {
  //     const { status } = await wolkRest.dashboard().listLight();

  //     expect(status).toEqual(200);
  //   });
  // });

  describe('[POST] /api/dashboards/', async () => {
    test('Should create new dashboard', async () => {
      const { data: id, status } = await wolkRest.dashboard().create({
        name: fromResources.dashboardName
      });
      newDashboardId = id;
      expect(status).toEqual(201);
    });
  });

  describe('[GET] /api/dashboards/{dashboardId}', async () => {
    test('Should get dashboard details', async () => {
      jest.setTimeout(10000);
      const { data: dashboard, status } = await wolkRest.dashboard().read(newDashboardId);
      expect(dashboard.name).toEqual(fromResources.dashboardName);
      expect(status).toEqual(200);
    });
  });

  describe('[PUT] /api/dashboards/{dashboardId}', async () => {
    test('Should UPDATE dashboard details', async () => {
      const updatedNameDto = `${fromResources.dashboardName}[UPDATED]`;
      const { status } = await wolkRest.dashboard()
      .update(newDashboardId,
        updatedNameDto
      );
      const { data: updatedDashboard } = await wolkRest.dashboard().read(newDashboardId);
      expect(updatedDashboard.name).toEqual(updatedNameDto);
      expect(status).toEqual(200);
    });
  });

  describe('[DELETE] /api/dashboards/{id}', async () => {
    test('Should DELETE dashboard', async () => {
      const { status } = await wolkRest.dashboard()
        .delete(newDashboardId);
      expect(status).toEqual(200);
    });
  });

  describe('[DELETE] /api/dashboards/{id}', async () => {
    test('Should fail to DELETE dashboard', async () => {
      try {
        await wolkRest.dashboard()
          .delete(newDashboardId);
      } catch ({ code }) {
        expect(code).toEqual(404);
      }
    });
  });

});
