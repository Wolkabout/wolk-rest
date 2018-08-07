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
    const { data }: { data: SignInResponse} = await wolkRest.auth().emailSignIn({
      username: user.valid.email,
      password: user.valid.password
    });

    expect(data.user.email).to.equal(user.valid.email);
  });

  it('[POST] /api/emailSignIn - Invalid credentials', async () => {
    try {
      await wolkRest.auth().emailSignIn({
        username: user.invalid.email,
        password: user.invalid.password
      });
    } catch (err) {
      expect(err.response.status).to.equal(401);
    }
  });

});
