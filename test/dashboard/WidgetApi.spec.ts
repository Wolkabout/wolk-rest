import * as fromModels from '../../src/dashboard/model';
import { WolkREST } from '../../src/wolk-rest';
import { getAuthenticatedWolkRestInstance } from '../utils';
import * as fromResources from './resources';

describe('Widget API', () => {
  let wolkRest: WolkREST;
  let newWidgetId: number;
  let widgetItems: fromModels.WidgetItem[];

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[POST] /api/dashboard/{dashboardId}/widget', async () => {
    test('Should create reading widget on dashboard', async () => {
      const { data: id, status } = await wolkRest.widget().create(
        fromResources.dashboardId,
        fromResources.readingWidgetDataNoId
      );
      newWidgetId = id;
      expect(id).not.toBeUndefined();
      expect(status).toEqual(201);
    });
  });

  describe('[POST] /api/dashboard/{dashboardId}/widget', async () => {
    test('Should not create reading widget on non existing dashboard', async () => {
      try {
        await wolkRest.widget().create(
          0,
          fromResources.readingWidgetData
        );
      } catch ({ code, type }) {
        expect(code).toEqual(404);
        expect(type).toEqual('NOT_FOUND');
      }
    });
  });

  describe('[GET] /api/dashboard/{dashboardId}/widgets/{id}', async () => {
    test('Should get single Widget', async () => {
      const { data: widget, status } = await wolkRest.widget().read(
        fromResources.dashboardId,
        newWidgetId
      );

      expect(status).toEqual(200);
      expect(widget.id).toEqual(newWidgetId);
    });
  });

  describe('[PUT] /api/dashboards/{dashboardId}/widgets/{id}', async () => {
    beforeAll(async () => {
      await wolkRest.widget().create(fromResources.dashboardId, fromResources.readingWidgetDataNoId);

      const { data: widget } = await wolkRest.widget().read(fromResources.dashboardId, newWidgetId);
      widgetItems =  widget.items;

    });

    test('Should update widget', async () => {
      const updateDto = {
        id: newWidgetId,
        col: 1,
        row: 1,
        items: widgetItems
      };

      const widgetDto: fromModels.Widget = Object.assign(fromResources.readingWidgetDataNoId, updateDto);
      const { status } = await wolkRest.widget().update(fromResources.dashboardId, widgetDto);

      expect(status).toEqual(200);
    });
  });

  describe('[DELETE] /api/dashboards/{dashboardId}/widgets/{id}', async () => {
    test('Should delete widget', async () => {
      const { status } = await wolkRest.widget().delete(fromResources.dashboardId, newWidgetId);

      expect(status).toEqual(200);
    });
  });

  describe('[PUT] /api/dashboards/{dashboardId}/widgets', async () => {
    let dashboardList: any;

    beforeAll(async () => {
      const { data } = await wolkRest.dashboard().list();
      dashboardList = data;
    });

    test('Should UPDATE widgets bulk', async () => {
      const { widgets } = dashboardList
        .find((dashboard: fromModels.Dashboard) => fromResources.dashboardId === dashboard.id);
      const { status } = await wolkRest.widget().updateBulk(fromResources.dashboardId, widgets);

      expect(status).toEqual(200);
    });
  });

});
