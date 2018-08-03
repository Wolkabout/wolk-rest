import { expect } from 'chai';
import WolkREST from '../../src';
import ServerDetails from '../../src/info/model/ServerDetails';
import environment from '../resources/environment';
import serverInfo from './resources/serverInfo';
import { isTypeofBoolean } from '../utils';

describe('Infos API', () => {
  let wolkRest: WolkREST;

  before(() => {
    wolkRest = new WolkREST(environment.baseURL);
  });

  it('[GET] /api/infos/server', async () => {
    const serverDetails: ServerDetails = await wolkRest.info().serverDetails();

    expect(serverDetails).to.deep.include(serverInfo);
  });

  it('[GET] /api/infos/availableProtocols', async () => {
    const availableProtocols: string[] = await wolkRest.info().availableProtocols();

    expect(availableProtocols).to.be.an.instanceof(Array);
  });

  it('[GET] /api/infos/signupEnabled', async () => {
    const signupEnabled: boolean = await wolkRest.info().signupEnabled();

    expect(signupEnabled).to.satisfy(isTypeofBoolean);
  });

});
