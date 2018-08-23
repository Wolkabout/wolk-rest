import { expect } from 'chai';
import * as fromConfig from '../../src/utils/config';
import { WolkREST } from './../../src/index';
import * as fromResources from './resources/user';

describe('Authentication API', () => {
  let wolkRest: WolkREST;

  before(() => {
    wolkRest = new WolkREST(fromConfig.WA_TEST_BASEURL);
  });

  it('[POST] /api/emailSignIn', async () => {
    const { data, status } = await wolkRest.auth().emailSignIn({
      username: fromConfig.WA_TEST_USER,
      password: fromConfig.WA_TEST_PASS
    });

    expect(status).to.equal(200);
    expect(data.user.email).to.equal(fromConfig.WA_TEST_USER);
  });

  it('[POST] /api/emailSignIn - Invalid credentials', async () => {
    try {
      await wolkRest.auth().emailSignIn({
        username: fromResources.invalidUser.email,
        password: fromResources.invalidUser.password
      });
    } catch ({ code }) {
      expect(code).to.equal(401);
    }
  });

});
