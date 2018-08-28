import { WolkREST } from '../../src/wolk-rest';

import { HTTP_ERRORS } from '../../src/utils/HTTPErrorsEnum';
import { getAuthenticatedWolkRestInstance } from '../utils';

import * as fromResources from './resources';

describe('ReadingType API', () => {
  let wolkRest: WolkREST;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[GET] /api/readingTypes', async () => {
    test('Should get system reading types', async () => {
      const { status } = await wolkRest.readingType().getList();

      expect(status).toEqual(200);
    });

    test('Should fail to get system reading types', async () => {
      try {
        await wolkRest.readingType().getList();
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('[POST] /api/readingTypes/{id}/units', async () => {
    let customUnitId: number;

    // Delete test unit if exist
    beforeAll(async () => {
      try {
        const units = await wolkRest.unit().getList('', fromResources.unitDto.readingTypeId);
        const testUnit = units.data.find(unit => unit.name === fromResources.unitDto.name);
        testUnit && await wolkRest.unit().deleteUnit(testUnit.id);
      } catch (error) {
        //
      }
    });

    test('Should create custom unit', async () => {
      const { status, data: unitId } = await wolkRest.readingType().createUnit(fromResources.unitDto);
      customUnitId = unitId;

      expect(status).toEqual(201);
    });

    test('Should fail to create custom unit', async () => {
      try {
        await wolkRest.readingType().createUnit(fromResources.unitDto);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.CONFLICT);
      }
    });

    afterAll(async () => {
      await wolkRest.unit().deleteUnit(customUnitId);
    });
  });
});
