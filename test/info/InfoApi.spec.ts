import { expect } from 'chai';
import WolkREST from '../../src';
import * as fromConfig from '../../src/utils/config';
import { isTypeofBoolean } from '../utils';
import * as fromResources from './resources';

describe('Infos API', () => {
  let wolkRest: WolkREST;

  before(() => {
    wolkRest = new WolkREST(fromConfig.WA_TEST_BASEURL);
  });

  it('[GET] /api/infos/server', async () => {
    const { data: serverDetails, status } = await wolkRest.info().serverDetails();

    expect(serverDetails).to.deep.include(fromResources.server);
    expect(status).to.be.equal(200);
  });

  it('[GET] /api/infos/availableProtocols', async () => {
    const { data: availableProtocols, status } = await wolkRest.info().availableProtocols();

    expect(availableProtocols).to.be.an.instanceof(Array);
    expect(status).to.be.equal(200);
  });

  it('[GET] /api/infos/signupEnabled', async () => {
    const { data: signupEnabled, status } = await wolkRest.info().signupEnabled();

    expect(signupEnabled).to.satisfy(isTypeofBoolean);
    expect(status).to.be.equal(200);
  });

});
