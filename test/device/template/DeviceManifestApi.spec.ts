import { expect } from 'chai';
import WolkREST from '../../../src';
import * as fromResources from './resources';
import { getAuthenticatedWolkRestInstance } from '../../utils';
import HTTP_ERRORS from '../../../src/utils/HTTPErrorsEnum';

describe('DeviceTemplate/Manifest API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  it('[GET] /api/deviceManifests', async () => {
    const { data: deviceManifest, status } =
      await wolkRest.deviceManifest().getPublicDeviceManifest(fromResources.deviceManifest.name);

    expect(deviceManifest).to.deep.include(fromResources.deviceManifest);
    expect(status).to.equals(200);
  });

  it('[GET] /api/deviceManifests - Fail', async () => {
    try {
      await wolkRest.deviceManifest().getPublicDeviceManifest(fromResources.deviceManifestFailName);
    } catch ({ code, type }) {
      expect(code).to.equals(HTTP_ERRORS.NOT_FOUND);
    }

  });

  it('[GET] /api/deviceManifests - Short object', async () => {
    const { data: deviceManifests, status } =
      await wolkRest.deviceManifest().listDeviceManifestsShort();

    expect(deviceManifests).to.be.an('array');
    expect(status).to.equals(200);
  });

});
