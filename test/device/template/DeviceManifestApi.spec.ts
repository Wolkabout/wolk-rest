import { expect } from 'chai';
import WolkREST from '../../../src';

import { HTTP_ERRORS } from '../../../src/utils';
import { getAuthenticatedWolkRestInstance } from '../../utils';

import * as fromModels from '../../../src/device/template/model';
import * as fromResources from './resources';

describe('DeviceTemplate/Manifest API', () => {
  let wolkRest: WolkREST;
  let newManifestId: number;
  let createdDevice: fromModels.DeviceDTO;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[GET] /api/deviceManifests', async () => {

    it('Should get device manifest by name', async () => {
      const { data: deviceManifest, status } =
      await wolkRest.deviceManifest().getPublicDeviceManifest(fromResources.deviceManifest.name);

      expect(deviceManifest).to.deep.include(fromResources.deviceManifest);
      expect(status).to.equals(200);
    });

    it('Should fail to find device manifest by name', async () => {
      try {
        await wolkRest.deviceManifest().getPublicDeviceManifest(fromResources.deviceManifestFailName);
      } catch ({ code, type }) {
        expect(code).to.equals(HTTP_ERRORS.NOT_FOUND);
      }

    });

    it('Should get manifest details by Id', async () => {
      const { data: deviceManifest, status } =
      await wolkRest.deviceManifest().getDeviceManifest(fromResources.deviceManifest.id!);

      expect(deviceManifest).to.deep.include(fromResources.deviceManifest);
      expect(status).to.equals(200);
    });

    it('Should fail to get manifest details by Id', async () => {
      try {
        await wolkRest.deviceManifest().getDeviceManifest(2000);
      } catch ({ code }) {
        expect(code).to.equals(HTTP_ERRORS.NOT_FOUND);
      }

    });

    it('Should get device manifest list - short object', async () => {
      const { data: deviceManifests, status } =
      await wolkRest.deviceManifest().listDeviceManifestsShort();

      expect(deviceManifests).to.be.an('array');
      expect(status).to.equals(200);
    });

  });

  context('[POST] /api/deviceManifests', async () => {
    it('Should create device manifest', async () => {
      const { status, data: manifestId } = await wolkRest.deviceManifest().createManifest(
        fromResources.deviceManifest
      );
      expect(status).to.be.equal(201);
      newManifestId = manifestId;
    });
    after(async () => {
      await wolkRest.deviceManifest().deleteManifest(newManifestId);
    });
  });

  context('[PUT] /api/deviceManifests/{manifestId}', async () => {
    it('Should fail to update device manifest', async () => {
      try {
        await wolkRest.deviceManifest().updateDeviceManifest(
          fromResources.deviceManifestFail
        );
      } catch ({ code, type }) {
        expect(code).to.be.equal(404);
        expect(type).to.be.equal('NOT_FOUND');
      }
    });
  });

  context('[PUT] /api/deviceManifests/{manifestId}', async () => {
    // Create manifest to be updated
    const manifestDto: fromModels.DeviceManifest = Object.assign({}, fromResources.deviceManifest,
      fromResources.updateDto);

    before(async () => {

      const { data: manifestId } = await wolkRest.deviceManifest().createManifest(manifestDto);
      newManifestId = manifestId;
      await wolkRest.deviceManifest().getDeviceManifest(newManifestId);

    });

    it('Should update manifest', async () => {

      const updatedManifest = Object.assign({}, manifestDto, { id: newManifestId });

      const { status } = await wolkRest.deviceManifest().updateDeviceManifest(updatedManifest);

      expect(status).to.be.equal(200);
    });
  });

  context('[DELETE] /api/deviceManifests/{manifestId}', async () => {
    it('Should delete device manifest', async () => {
      const { status } = await wolkRest.deviceManifest().deleteManifest(newManifestId);

      expect(status).to.be.equal(200);
    });

    it('Should fail to delete device manifest', async () => {
      try {
        await wolkRest.deviceManifest().deleteManifest(newManifestId);
      } catch ({ code }) {
        expect(code).to.be.equal(HTTP_ERRORS.NOT_FOUND);
      }

    });

  });

  context('[POST] /api/deviceManifests/{manifestId}/devices', async () => {
    it('Should create device from manifest', async () => {
      const { status, data: devices } = await wolkRest.deviceManifest()
        .registerDevice(fromResources.deviceManifest.id!, fromResources.createDeviceFromManifest);

      [createdDevice] = devices;
      expect(status).to.be.equal(201);
    });
  });

  context('[POST] /api/deviceManifests/devicesEmail', async () => {
    it('Should send email with device credentials', async () => {
      const sendCredentials: fromModels.SendCredentialsDTO[] = [{
        deviceKey: createdDevice.deviceKey,
        name: createdDevice.name,
        password: createdDevice.password
      }];

      const { status } = await wolkRest.deviceManifest()
        .sendCredentialsEmail(sendCredentials);

      expect(status).to.be.equal(200);
    });
    after(async () => {
      await wolkRest.device().deleteBulk([createdDevice.id]);
    });
  });

});
