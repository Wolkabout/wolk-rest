import { expect } from 'chai';
import WolkREST from '../../../src';
import environment from '../../resources/environment';
import DeviceManifest from '../../../src/device/template/model/DeviceManifest';
import fromResource from './resources/deviceManifest';
import fromAuthUser from '../../authentication/resources/user';

describe('DeviceTemplate/Manifest API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = new WolkREST(environment.baseURL);
    await wolkRest.auth().emailSignIn({
      username: fromAuthUser.valid.email,
      password: fromAuthUser.valid.password
    });
  });

  it('[GET] /api/deviceManifests', async () => {
    const deviceManifest: DeviceManifest = await wolkRest.deviceManifest()
    .getPublicDeviceManifest(fromResource.name);

    expect(deviceManifest).to.deep.include('Pyhton');
  });

});
