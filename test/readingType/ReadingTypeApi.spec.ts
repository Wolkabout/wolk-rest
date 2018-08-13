import { expect } from 'chai';
import WolkREST from '../../src';
import { getAuthenticatedWolkRestInstance } from '../utils';
import * as fromResources from './resources/index';

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
  });

  context('[GET] /api/readingTypes', async () => {
    let customUnitId: number;
    it('Should create custom unit', async () => {
      const { status, data: unitId } = await wolkRest.readingType().createUnit(fromResources.unitDto);
      customUnitId = unitId;
      expect(status).to.equal(201);
    });

    after(async () => {
      await wolkRest.unit().deleteUnit(customUnitId);
    });
  });

});
