import * as fromConfig from '../../src/utils/config';
import { WolkREST } from '../../src/wolk-rest';
import * as fromResources from './resources/user';

describe('Authentication API', () => {
  let wolkRest: WolkREST;

  beforeAll(() => {
    wolkRest = new WolkREST(fromConfig.WA_TEST_BASEURL);
  });

  test('[POST] /api/emailSignIn', async () => {
    const { data, status } = await wolkRest.auth().emailSignIn({
      username: fromConfig.WA_TEST_USER,
      password: fromConfig.WA_TEST_PASS
    });

    expect(status).toEqual(200);
    expect(data.user.email).toEqual(fromConfig.WA_TEST_USER);
  });

  test('[POST] /api/emailSignIn - Invalid credentials', async () => {
    try {
      await wolkRest.auth().emailSignIn({
        username: fromResources.invalidUser.email,
        password: fromResources.invalidUser.password
      });
    } catch ({ code }) {
      expect(code).toEqual(401);
    }
  });
});
