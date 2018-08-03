import { expect } from 'chai';
import WolkREST from '../../src';
import environment from '../resources/environment';
import user from '../authentication/resources/user';
import ReadingType from '../../src/readingType/model/ReadingType';

describe('ReadingType API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = new WolkREST(environment.baseURL);
    await wolkRest.auth().emailSignIn({
      username: user.valid.email,
      password: user.valid.password
    });
  });

  context('[GET] /api/readingTypes', async () => {
    it('Should get system reading types', async () => {
      const readingTypes: ReadingType[] = await wolkRest.readingType().getList();

      expect(readingTypes).to.not.be.undefined;
    });
  });

});
