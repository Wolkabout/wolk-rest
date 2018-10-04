import { WolkREST } from '../../src/wolk-rest';

import { HTTP_ERRORS } from '../../src/utils';
import { getAuthenticatedWolkRestInstance } from '../utils';

import * as fromModels from '../../src/device/template/model';
import * as fromResources from './resources/device';
import * as fromTemplateResources from './template/resources';

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

  describe('[GET] /api/devices/{deviceKey}', async () => {
    test('Should get device details by key', async () => {
      const { status, data } = await wolkRest.device().getDeviceByKey('sremDevice');

      expect(status).toEqual(200);
      expect.any(data);
    });

    test('Should fail to get non existing device details by key', async () => {
      try {
        await wolkRest.device().getDeviceByKey('');
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.BAD_REQUEST);
      }
    });
  });

  describe('[PUT] /api/devices/{deviceKey}', async () => {
    let newDeviceId: number;
    let newDeviceKey: string;

    beforeAll(async () => {
      const {
        data: { id, deviceKey }
      } = await wolkRest.device().create(fromResources.deviceCreationDto);
      newDeviceId = id;
      newDeviceKey = deviceKey;
    });
    test('Should generate new password for device by key', async () => {
      const { status, data } = await wolkRest.device().generatePassword(newDeviceKey);

      expect(status).toEqual(200);
      expect.any(data);
    });

    test('Should change name for device by key', async () => {
      const { status, data } = await wolkRest.device().renameDevice(newDeviceKey, 'NEW NAME');

      expect(status).toEqual(200);
      expect.any(data);
    });

    test('Should fail to generate new password for device by key', async () => {
      try {
        await wolkRest.device().generatePassword('');
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.INTERNAL_SERVER_ERROR); // should be not found, server has bug atm
      }
    });

    afterAll(async () => {
      await wolkRest.device().deleteBulk([newDeviceId]);
    });
  });

  describe('[POST] /api/devices', async () => {
    let newDeviceId;
    let newJasperId;
    let newLoraId;

    test('Should create new standard mqtt_broker device', async () => {
      const {
        status,
        data: { id }
      } = await wolkRest.device().create(fromResources.deviceCreationDto);

      newDeviceId = id;
      expect(status).toBe(201);
      expect.objectContaining(fromResources.deviceCreationDto);
    });

    test('Should create new jasper device', async () => {
      const {
        status,
        data: { id }
      } = await wolkRest.device().createJasper(fromResources.jasperCreationDto);

      newJasperId = id;
      expect(status).toBe(201);
      expect.objectContaining(fromResources.jasperCreationDto);
    });

    test('Should create new LoRa device', async () => {
      const {
        status,
        data: { id }
      } = await wolkRest.device().createLoRa(fromResources.loRaCreationDto);

      newLoraId = id;
      expect(status).toBe(201);
      expect.objectContaining(fromResources.jasperCreationDto);
    });

    test('Should fail to create new device', async () => {
      try {
        await wolkRest.device().create(fromResources.failCreationDto);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.BAD_REQUEST);
      }
    });

    afterAll(async () => {
      await wolkRest.device().deleteBulk([newDeviceId, newJasperId, newLoraId]);
    });
  });

  describe('[DELETE] /api/device', async () => {
    let singleDeviceId;
    beforeAll(async () => {
      const { data: devices } = await wolkRest
        .deviceManifest()
        .registerDevice(fromTemplateResources.deviceManifest.id!, fromTemplateResources.createDeviceFromManifest);

      const {
        data: { id }
      } = await wolkRest.device().create(fromResources.deviceCreationDto);

      [deviceToDelete] = devices;
      singleDeviceId = id;
    });

    test('Should delete devices bulk', async () => {
      const { status } = await wolkRest.device().deleteBulk([deviceToDelete.id]);

      expect(status).toEqual(200);
    });

    test('Should delete devices', async () => {
      const { status } = await wolkRest.device().delete(singleDeviceId);

      expect(status).toEqual(200);
    });

    test('Should fail to delete the devices bulk', async () => {
      try {
        await wolkRest.device().deleteBulk([deviceToDelete.id]);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }
    });

    test('Should fail to delete the device', async () => {
      try {
        await wolkRest.device().delete(singleDeviceId);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }
    });
  });
});
