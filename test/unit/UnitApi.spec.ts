import { HTTP_ERRORS } from '../../src/utils';
import { WolkREST } from '../../src/wolk-rest';
import { getAuthenticatedWolkRestInstance } from '../utils';
import * as fromResources from './resources';

describe('Unit API', () => {
  let wolkRest: WolkREST;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[GET] /api/units', async () => {
    test('Should get paged units, without any params', async () => {
      const { data: pagedUnits, status } = await wolkRest.unit().getPage();

      expect(status).toEqual(200);
      expect(pagedUnits.content).toBeInstanceOf(Array);
    });

    test('Should get paged units with params', async () => {
      const params = {
        sort: 'name,desc',
        page: 0,
        size: 10
      };
      const { data: pagedUnits, status } = await wolkRest.unit().getPage(params);

      expect(status).toEqual(200);
      expect(pagedUnits.size).toEqual(params.size);
      expect(pagedUnits.sort.sorted).toBe(true);
    });
  });

  describe('[DELETE] /api/units', async () => {
    let customUnitId: number;

    beforeAll(async () => {
      const { data: unitId } = await wolkRest.readingType().createUnit(fromResources.unitDto);
      customUnitId = unitId;
    });

    test('Should delete single unit', async () => {
      const { status } = await wolkRest.unit().deleteUnit(customUnitId);

      expect(status).toEqual(200);
    });
  });

  describe('[DELETE] /api/units - BULK', async () => {
    let customUnitId: number;

    beforeAll(async () => {
      const { data: unitId } = await wolkRest.readingType().createUnit(fromResources.unitDto);
      customUnitId = unitId;
    });

    test('Should delete bulk units by ids', async () => {
      const { status } = await wolkRest.unit().deleteBulk([customUnitId]);

      expect(status).toEqual(200);
    });

    test('Should fail to delete', async () => {
      try {
        await wolkRest.unit().deleteBulk([customUnitId]);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }
    });
  });
});
