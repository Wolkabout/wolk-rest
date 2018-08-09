import { expect } from 'chai';
import WolkREST from '../../../src';
import DeviceManifest from '../../../src/device/template/model/DeviceManifest';
import fromResource from './resources/deviceManifest';
import { getAuthenticatedWolkRestInstance } from '../../utils';

describe('DeviceTemplate/Manifest API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  it('[GET] /api/deviceManifests', async () => {
    const deviceManifest: DeviceManifest = await wolkRest.deviceManifest().getPublicDeviceManifest(fromResource.name);

    expect(deviceManifest).to.deep.include('Pyhton');
  });

});
