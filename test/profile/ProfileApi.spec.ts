import { WA_TEST_PASS, WA_TEST_USER } from '../../src/utils/config';
import { WolkREST } from '../../src/wolk-rest';
import { getAuthenticatedWolkRestInstance, getRandomString } from '../utils';

describe('Profile API', () => {
  let wolkRest: WolkREST;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[PUT] /api/users/me', async () => {
    test('Should update current user: first and last name', async () => {
      const userUpdateDto = {
        firstName: getRandomString(),
        lastName: getRandomString()
      };
      const { status } = await wolkRest.profile().userUpdateName(userUpdateDto);

      expect(status).toEqual(200);
    });
  });

  describe('[GET] /api/users/me', async () => {
    test('Should get current user', async () => {
      const { status, data: userDetails } = await wolkRest.profile().getProfile();

      expect(status).toEqual(200);
      expect(typeof userDetails.email).toBe('string');
      expect(typeof userDetails.active).toBe('boolean');
    });
  });

  describe('[PUT] /api/users/me', async () => {
    test('Should update current user: first name, last name and email', async () => {
      const userUpdateDto = {
        firstName: getRandomString(),
        lastName: getRandomString(),
        email: WA_TEST_USER
      };
      const { status } = await wolkRest.profile().userUpdate(userUpdateDto);

      expect(status).toEqual(200);
    });
  });

  describe('[GET] /api/users/me/endpoints', async () => {
    test('Should get list of endpoints', async () => {
      const { status, data: endpointsList } = await wolkRest.profile().myEndpoints('WEB_SOCKET');

      expect(status).toEqual(200);
      expect(endpointsList).toBeInstanceOf(Array);
    });
  });

  describe('[POST] /api/users/me/httpPublishingKey', async () => {
    test('Should get Access Key', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const { status } = await wolkRest.profile().getAccessKey(futureDate.getTime());

      expect(status).toEqual(200);
    });
  });

  describe('[PUT] /api/users/me/passwordChange', async () => {
    test('Should change current user password', async () => {
      const passwordChangeDto = {
        oldPassword: WA_TEST_PASS,
        newPassword: WA_TEST_PASS,
        username: WA_TEST_USER
      };
      const { status } = await wolkRest.profile().passwordChange(passwordChangeDto);

      expect(status).toEqual(200);
    });
  });

  describe('[GET] /api/users/me/permissions', async () => {
    test('Should get current users permissions', async () => {
      const { status, data: permissionsList } = await wolkRest.profile().myPermissions();

      expect(status).toEqual(200);
      expect(permissionsList).toBeInstanceOf(Array);
    });
  });
});
