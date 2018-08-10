import { expect } from 'chai';
import WolkREST from '../../src';
import { getAuthenticatedWolkRestInstance } from '../utils';

describe('ReadingType API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[GET] /api/readingTypes', async () => {
    it('Should get system reading types', async () => {
      const { data: readingTypes, status } = await wolkRest.readingType().getList();

      expect(status).to.equal(200);
      expect(readingTypes).to.be.an.instanceof('array');
    });
  });

});
