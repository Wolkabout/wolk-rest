import { expect } from 'chai';
import WolkREST from '../../src/index';
import environment from '../resources/environment';
import serverInfo from './resources/serverInfo';
import { isTypeofBoolean } from '../utils/index';

describe('Infos API', () => {
  let wolkRest: WolkREST;

  before(() => {
    wolkRest = new WolkREST(environment.baseURL);
  });

  it('[GET] /api/infos/server', async () => {
    const { data: serverDetails, status }
      = await wolkRest.info().serverDetails();

    expect(serverDetails).to.deep.include(serverInfo);
    expect(status).to.be.equal(200);
  });

  it('[GET] /api/infos/availableProtocols', async () => {
    const { data: availableProtocols, status }
      = await wolkRest.info().availableProtocols();

    expect(availableProtocols).to.be.an.instanceof(Array);
    expect(status).to.be.equal(200);
  });

  it('[GET] /api/infos/signupEnabled', async () => {
    const { data: signupEnabled, status }
      = await wolkRest.info().signupEnabled();

    expect(signupEnabled).to.satisfy(isTypeofBoolean);
    expect(status).to.be.equal(200);
  });

});
