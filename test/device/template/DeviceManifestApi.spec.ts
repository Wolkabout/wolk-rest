import { expect } from 'chai';
import WolkREST from '../../../src';
import { getAuthenticatedWolkRestInstance } from '../../utils';
import { HTTP_ERRORS } from '../../../src/utils';
import * as fromResources from './resources';
import * as fromModels from '../../../src/device/template/model';

describe('DeviceTemplate/Manifest API', () => {
  let wolkRest: WolkREST;
  let newManifestId: number;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  it('[GET] /api/deviceManifests', async () => {
    const { data: deviceManifest, status } =
      await wolkRest.deviceManifest().getPublicDeviceManifest(fromResources.deviceManifest.name);

    expect(deviceManifest).to.deep.include(fromResources.deviceManifest);
    expect(status).to.equals(200);
  });

  it('[GET] /api/deviceManifests/{manifestId}', async () => {
    const { data: deviceManifest, status } =
      await wolkRest.deviceManifest().getDeviceManifest(fromResources.deviceManifest.id!);

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
  });

});
