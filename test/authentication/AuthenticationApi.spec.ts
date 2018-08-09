import { expect } from 'chai';
import WolkREST from '../../src/index';
import environment from '../resources/environment';
import user from './resources/user';

describe('Authentication API', () => {
  let wolkRest: WolkREST;

  before(() => {
    wolkRest = new WolkREST(environment.baseURL);
  });

  it('[POST] /api/emailSignIn', async () => {
    const { data, status } = await wolkRest.auth().emailSignIn({
      username: user.valid.email,
      password: user.valid.password
    });

    expect(status).to.equal(200);
    expect(data.user.email).to.equal(user.valid.email);
  });

  it('[POST] /api/emailSignIn - Invalid credentials', async () => {
    try {
      await wolkRest.auth().emailSignIn({
        username: user.invalid.email,
        password: user.invalid.password
      });
    } catch ({ code }) {
      expect(code).to.equal(401);
    }
  });

});
