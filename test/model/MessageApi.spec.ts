import { expect } from 'chai';
import WolkREST from '../../src';
import environment from '../resources/environment';
import user from '../authentication/resources/user';

describe('Message API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = new WolkREST(environment.baseURL);
    await wolkRest.auth().emailSignIn({
      username: user.valid.email,
      password: user.valid.password
    });
  });

  context('[GET] /api/messages', async () => {
    // before(async () => {
    // });

    it('Should get paged messages', async () => {
      const { data: brandDetails, status } = await wolkRest.message().pageMessages();

      expect(status).to.equal(200);
      // expect(brandDetails).to.deep.include(brandMock.BRANDING_1);
    });
  });

});
