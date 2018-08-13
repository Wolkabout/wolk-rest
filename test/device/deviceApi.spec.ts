import { expect } from 'chai';
import WolkREST from '../../src';

import { HTTP_ERRORS } from '../../src/utils';
import { getAuthenticatedWolkRestInstance } from '../utils';

import * as fromModels from '../../src/device/template/model';
import * as fromResources from './template/resources';

describe('Device API', () => {
  let wolkRest: WolkREST;
  let deviceToDelete: fromModels.DeviceDTO;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[DELETE] /api/device', async () => {
    before(async () => {
      const { data: devices } = await wolkRest.deviceManifest()
        .registerDevice(fromResources.deviceManifest.id!, fromResources.createDeviceFromManifest);

      [deviceToDelete] = devices;
    });

    it('Should delete device', async () => {
      const { status } = await wolkRest.device().deleteBulk([deviceToDelete.id]);

      expect(status).to.be.equal(200);
    });

    it('Should fail to delete the device', async () => {
      try {
        await wolkRest.device().deleteBulk([deviceToDelete.id]);
      } catch ({ code }) {
        expect(code).to.be.equal(HTTP_ERRORS.NOT_FOUND);
      }

    });

  });
});
