import { expect } from 'chai';
import WolkREST from '../../src';
import { HTTP_ERRORS } from '../../src/utils/HTTPErrorsEnum';
import { getAuthenticatedWolkRestInstance } from '../utils';
import * as fromResources from './resources';

describe('ReadingType API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[GET] /api/readingTypes', async () => {
    it('Should get system reading types', async () => {
      const { status } = await wolkRest.readingType().getList();

      expect(status).to.equal(200);
    });

    it('Should fail to get system reading types', async () => {
      try {
        await wolkRest.readingType().getList();
      } catch ({ code }) {
        expect(code).to.equal(HTTP_ERRORS.INTERNAL_SERVER_ERROR);
      }

    });
  });

  context('[POST] /api/readingTypes/{id}/units', async () => {
    let customUnitId: number;
    it('Should create custom unit', async () => {
      const { status, data: unitId } = await wolkRest.readingType().createUnit(fromResources.unitDto);
      customUnitId = unitId;
      expect(status).to.equal(201);
    });

    it('Should fail to create custom unit', async () => {
      try {
        await wolkRest.readingType().createUnit(fromResources.unitDto);
      } catch ({ code }) {
        expect(code).to.equal(HTTP_ERRORS.CONFLICT);
      }
    });

    after(async () => {
      await wolkRest.unit().deleteUnit(customUnitId);
    });
  });
});
