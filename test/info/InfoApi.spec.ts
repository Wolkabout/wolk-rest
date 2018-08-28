import * as fromConfig from '../../src/utils/config';
import { WolkREST } from '../../src/wolk-rest';
import * as fromResources from './resources';

describe('Infos API', () => {
  let wolkRest: WolkREST;

  beforeAll(() => {
    wolkRest = new WolkREST(fromConfig.WA_TEST_BASEURL);
  });

  test('[GET] /api/infos/server', async () => {
    const { data: serverDetails, status } = await wolkRest.info().serverDetails();

    expect(serverDetails).toEqual(
      expect.objectContaining(fromResources.server)
    );
    expect(status).toEqual(200);
  });

  test('[GET] /api/infos/availableProtocols', async () => {
    const { data: availableProtocols, status } = await wolkRest.info().availableProtocols();

    expect(availableProtocols).toBeInstanceOf(Array);
    expect(status).toEqual(200);
  });

  test('[GET] /api/infos/signupEnabled', async () => {
    const { data: signupEnabled, status } = await wolkRest.info().signupEnabled();

    expect(typeof signupEnabled).toBe('boolean');
    expect(status).toEqual(200);
  });
});
