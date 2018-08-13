import { expect } from 'chai';
import WolkREST from '../../src';
import { HTTP_ERRORS } from '../../src/utils';
import { getAuthenticatedWolkRestInstance } from '../utils';
import * as fromResources from './resources';

describe('Unit API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[GET] /api/units', async () => {
    it('Should get paged units, without any params', async () => {
      const { data: pagedUnits, status } = await wolkRest.unit().getPage();

      expect(status).to.equal(200);
      expect(pagedUnits.content).to.be.an.instanceof(Array);
    });

    it('Should get paged units with params', async () => {
      const params = {
        sort: 'name,desc',
        page: 0,
        size: 10
      };
      const { data: pagedUnits, status } = await wolkRest.unit().getPage(params);

      expect(status).to.equal(200);
      expect(pagedUnits.size).to.be.equal(params.size);
      expect(pagedUnits.sort.sorted).to.be.true;
    });

  });

  context('[DELETE] /api/units', async () => {
    let customUnitId: number;

    before(async () => {
      const { data: unitId } = await wolkRest.readingType().createUnit(fromResources.unitDto);
      customUnitId = unitId;
    });

    it('Should delete single unit', async () => {
      const { status } = await wolkRest.unit().deleteUnit(customUnitId);

      expect(status).to.equal(200);
    });
  });

  context('[DELETE] /api/units - BULK', async () => {
    let customUnitId: number;

    before(async () => {
      const { data: unitId } = await wolkRest.readingType().createUnit(fromResources.unitDto);
      customUnitId = unitId;
    });

    it('Should delete bulk units by ids', async () => {
      const { status } = await wolkRest.unit().deleteBulk([customUnitId]);

      expect(status).to.equal(200);
    });

    it('Should fail to delete', async () => {
      try {
        await wolkRest.unit().deleteBulk([customUnitId]);
      } catch ({ code }) {
        expect(code).to.equal(HTTP_ERRORS.NOT_FOUND);
      }
    });

  });

});
