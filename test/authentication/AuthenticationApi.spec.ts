import { expect } from 'chai';
import WolkREST from '../../src';
import SignInResponse from '../../src/authentication/model/SignInResponse';
import environment from '../resources/environment';
import user from './resources/user';

describe('Authentication API', () => {
  let wolkRest: WolkREST;

  before(() => {
    wolkRest = new WolkREST(environment.baseURL);
  });

  it('[POST] /api/emailSignIn', async () => {
    const authResponse: SignInResponse = await wolkRest.auth().emailSignIn({
      username: user.valid.email,
      password: user.valid.password
    });

    expect(authResponse.user.email).to.equal(user.valid.email);
  });

  it('[POST] /api/emailSignIn - Invalid credentials', async () => {
    const failedAuthResponse = await wolkRest.auth().emailSignIn({
      username: user.invalid.email,
      password: user.invalid.password
    });

    expect(failedAuthResponse.code).to.equal('ACCESS_ERROR');
  });

});
