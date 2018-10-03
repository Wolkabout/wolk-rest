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
  describe('[GET] /api/devices', async () => {
    test('Should get devices list with basic projection', async () => {
      const { status, data } = await wolkRest.device().list();

      expect(status).toEqual(200);
      expect(data).not.toHaveProperty('size');
    });
  });

  describe('[GET] /api/devices - PAGED', async () => {
    test('Should get devices list paged with basic projection', async () => {
      const { status, data } = await wolkRest.device().listPaged();

      expect(status).toEqual(200);
      expect(data).toHaveProperty('size');
    });
  });

  describe('[GET] /api/devices/countByState', async () => {
    test('Should get object with number of OFFLINE or ONLINE devices', async () => {
      const { status, data } = await wolkRest.device().countByState();

      expect(status).toEqual(200);
      expect(data).toHaveProperty('OFFLINE');
    });
  });

  describe('[GET] /api/devices/devicesUntilLimit', async () => {
    test('Should get number of devices left for users to create', async () => {
      const { status, data } = await wolkRest.device().numberOfDevicesUntilLimit();

      expect(status).toEqual(200);
      expect.any(data);
    });
  });

  describe('[DELETE] /api/device', async () => {
    beforeAll(async () => {
      const { data: devices } = await wolkRest
        .deviceManifest()
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
