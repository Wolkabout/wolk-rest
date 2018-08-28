import { WolkREST } from '../../src/wolk-rest';

import { HTTP_ERRORS } from '../../src/utils';
import { getAuthenticatedWolkRestInstance } from '../utils';

import * as fromModels from '../../src/device/template/model';
import * as fromResources from './template/resources';

describe('Device API', () => {
  let wolkRest: WolkREST;
  let deviceToDelete: fromModels.DeviceDTO;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[DELETE] /api/device', async () => {
    beforeAll(async () => {
      const { data: devices } = await wolkRest.deviceManifest()
        .registerDevice(fromResources.deviceManifest.id!, fromResources.createDeviceFromManifest);

      [deviceToDelete] = devices;
    });

    test('Should delete device', async () => {
      const { status } = await wolkRest.device().deleteBulk([deviceToDelete.id]);

      expect(status).toEqual(200);
    });

    test('Should fail to delete the device', async () => {
      try {
        await wolkRest.device().deleteBulk([deviceToDelete.id]);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }
    });
  });
});
