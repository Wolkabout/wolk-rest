import { WolkREST } from '../../../src/wolk-rest';

import { HTTP_ERRORS } from '../../../src/utils';
import { getAuthenticatedWolkRestInstance } from '../../utils';

import * as fromModels from '../../../src/device/template/model';
import * as fromResources from './resources';

describe('DeviceTemplate/Manifest API', () => {
  let wolkRest: WolkREST;
  let newManifestId: number;
  let createdDevice: fromModels.DeviceDTO;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[GET] /api/deviceManifests', async () => {
    test('Should get device manifest by name', async () => {
      const { data: deviceManifest, status } =
      await wolkRest.deviceManifest().getPublicDeviceManifest(fromResources.deviceManifest.name);

      expect(deviceManifest).toEqual(
        expect.objectContaining(fromResources.deviceManifest)
      );
      expect(status).toEqual(200);
    });

    test('Should fail to find device manifest by name', async () => {
      try {
        await wolkRest.deviceManifest().getPublicDeviceManifest(fromResources.deviceManifestFailName);
      } catch ({ code, type }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }
    });

    test('Should get manifest details by Id', async () => {
      const { data: deviceManifest, status } =
        await wolkRest.deviceManifest().getDeviceManifest(fromResources.deviceManifest.id!);

      expect(deviceManifest).toEqual(
        expect.objectContaining(fromResources.deviceManifest)
      );
      expect(status).toEqual(200);
    });

    test('Should fail to get manifest details by Id', async () => {
      try {
        await wolkRest.deviceManifest().getDeviceManifest(2000);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }
    });

    test('Should get device manifest list - short object', async () => {
      const { data: deviceManifests, status } = await wolkRest.deviceManifest().listDeviceManifestsShort();

      expect(deviceManifests).toBeInstanceOf(Array);
      expect(status).toEqual(200);
    });

  });

  describe('[POST] /api/deviceManifests', async () => {
    test('Should create device manifest', async () => {
      const { status, data: manifestId } = await wolkRest.deviceManifest().createManifest(
        fromResources.deviceManifest
      );
      expect(status).toEqual(201);
      newManifestId = manifestId;
    });

    afterAll(async () => {
      await wolkRest.deviceManifest().deleteManifest(newManifestId);
    });
  });

  describe('[PUT] /api/deviceManifests/{manifestId}', async () => {
    test('Should fail to update device manifest', async () => {
      try {
        await wolkRest.deviceManifest().updateDeviceManifest(
          fromResources.deviceManifestFail
        );
      } catch ({ code, type }) {
        expect(code).toEqual(404);
        expect(type).toEqual('NOT_FOUND');
      }
    });
  });

  describe('[PUT] /api/deviceManifests/{manifestId}', async () => {
    // Create manifest to be updated
    const manifestDto: fromModels.DeviceManifest = Object.assign(
        {},
        fromResources.deviceManifest,
        fromResources.updateDto
      );

    beforeAll(async () => {
      const { data: manifestId } = await wolkRest.deviceManifest().createManifest(manifestDto);
      newManifestId = manifestId;

      await wolkRest.deviceManifest().getDeviceManifest(newManifestId);
    });

    test('Should update manifest', async () => {
      const updatedManifest = Object.assign({}, manifestDto, { id: newManifestId });
      const { status } = await wolkRest.deviceManifest().updateDeviceManifest(updatedManifest);

      expect(status).toEqual(200);
    });
  });

  describe('[DELETE] /api/deviceManifests/{manifestId}', async () => {
    test('Should delete device manifest', async () => {
      const { status } = await wolkRest.deviceManifest().deleteManifest(newManifestId);

      expect(status).toEqual(200);
    });

    test('Should fail to delete device manifest', async () => {
      try {
        await wolkRest.deviceManifest().deleteManifest(newManifestId);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }

    });

  });

  describe('[POST] /api/deviceManifests/{manifestId}/devices', async () => {
    test('Should create device from manifest', async () => {
      const { status, data: devices } = await wolkRest.deviceManifest()
        .registerDevice(fromResources.deviceManifest.id!, fromResources.createDeviceFromManifest);

      [createdDevice] = devices;
      expect(status).toEqual(201);
    });
  });

  describe('[POST] /api/deviceManifests/devicesEmail', async () => {
    test('Should send email with device credentials', async () => {
      const sendCredentials: fromModels.SendCredentialsDTO[] = [{
        deviceKey: createdDevice.deviceKey,
        name: createdDevice.name,
        password: createdDevice.password
      }];

      const { status } = await wolkRest.deviceManifest()
        .sendCredentialsEmail(sendCredentials);

      expect(status).toEqual(200);
    });

    afterAll(async () => {
      await wolkRest.device().deleteBulk([createdDevice.id]);
    });
  });

});
