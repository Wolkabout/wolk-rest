import { expect } from 'chai';
import WolkREST from '../../src';
import ReadingType from '../../src/readingType/model/ReadingType';
import { getAuthenticatedWolkRestInstance } from '../utils';

describe('ReadingType API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[GET] /api/readingTypes', async () => {
    it('Should get system reading types', async () => {
      const readingTypes: ReadingType[] = await wolkRest.readingType().getList();

      expect(readingTypes).to.not.be.undefined;
    });
  });

});
