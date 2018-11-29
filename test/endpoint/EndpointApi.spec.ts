import { EndpointTypeEnum } from '../../src/endpoint/model';
import { HTTP_ERRORS } from '../../src/utils';
import { WolkREST } from '../../src/wolk-rest';
import { getAuthenticatedWolkRestInstance } from '../utils';
import { webSocketEndpoint, webSocketEndpointUpdate } from './resources';

describe('Endpoint API', () => {
  let wolkRest: WolkREST;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[POST] /api/endpoints', async () => {
    let endPointSessionId;

    test('Should create new endpoint session', async () => {
      const { status, data } = await wolkRest.endpoint().create(webSocketEndpoint);
      endPointSessionId = data;
      expect(status).toEqual(201);
    });

    test('Should fail to create new endpoint session with same value', async () => {
      try {
        await wolkRest.endpoint().create(webSocketEndpoint);
      } catch ({ code, type }) {
        expect(code).toEqual(HTTP_ERRORS.CONFLICT);
        expect(type).toEqual('CONFLICT');
      }
    });

    afterAll(async () => {
      await wolkRest.endpoint().delete(endPointSessionId);
    });
  });

  describe('[GET] /api/endpoints', async () => {
    let endPointSessionId;
    beforeAll(async () => {
      const { data } = await wolkRest.endpoint().create(webSocketEndpoint);
      endPointSessionId = data;
    });

    test('Should get list of opened endpoints', async () => {
      const { data, status } = await wolkRest.endpoint().list(EndpointTypeEnum.WEB_SOCKET);
      expect(data).toBeInstanceOf(Array);
      expect(status).toEqual(200);
    });

    test('Should get specific endpoint by id', async () => {
      const { data, status } = await wolkRest.endpoint().read(endPointSessionId);
      expect(data).toMatchObject(webSocketEndpoint);
      expect(status).toEqual(200);
    });

    afterAll(async () => {
      await wolkRest.endpoint().delete(endPointSessionId);
    });
  });

  describe('[PUT] /api/endpoints', async () => {
    let endPointSessionId;
    beforeAll(async () => {
      const { data } = await wolkRest.endpoint().create(webSocketEndpoint);
      endPointSessionId = data;
    });

    test('Should update existing endpoint', async () => {
      const updateDto = Object.assign({}, webSocketEndpoint, webSocketEndpointUpdate);
      const { status } = await wolkRest.endpoint().update(updateDto, endPointSessionId);
      expect(status).toEqual(200);
    });

    test('Should extend duration of existing endpoint', async () => {
      const { status } = await wolkRest.endpoint().extendDuration(endPointSessionId);
      expect(status).toEqual(200);
    });

    test('Should change options of existing endpoint', async () => {
      const { status } = await wolkRest.endpoint().updateOptions(true, endPointSessionId);
      expect(status).toEqual(200);
    });

    afterAll(async () => {
      await wolkRest.endpoint().delete(endPointSessionId);
    });
  });

  describe('[DELETE] /api/endpoints', async () => {
    let endPointSessionId;
    beforeAll(async () => {
      const { data } = await wolkRest.endpoint().create(webSocketEndpoint);
      endPointSessionId = data;
    });

    test('Should delete existing endpoint', async () => {
      const { status } = await wolkRest.endpoint().delete(endPointSessionId);
      expect(status).toEqual(200);
    });

    test('Should fail to delete non existing endpoint', async () => {
      try {
        await wolkRest.endpoint().delete(endPointSessionId);
      } catch ({ code, type }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
        expect(type).toEqual('NOT_FOUND');
      }
    });

    afterAll(async () => {
      await wolkRest.endpoint().delete(endPointSessionId);
    });
  });
});
