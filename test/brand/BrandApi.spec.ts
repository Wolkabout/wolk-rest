import { WolkREST } from '../../src/wolk-rest';
import { getAuthenticatedWolkRestInstance } from '../utils';
import * as fromResources from './resources';

describe('Brand API', () => {
  let wolkRest: WolkREST;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[GET] /api/brands', async () => {
    // Create brand
    beforeAll(async () => {
      try {
        await wolkRest.brand().deleteBrand();
      } catch (error) {
        // Brand already exist
      }

      try {
        await wolkRest.brand().create(fromResources.brand1);
      } catch (error) {
      }
    });

    test('Should get existing brand', async () => {
      const { data: brandDetails, status } = await wolkRest.brand().read();

      expect(status).toEqual(200);
      for (const key of Object.keys(fromResources.brand1)) {
        expect(Object.keys(brandDetails)).toContain(key);
      }
    });
  });

  describe('[POST] /api/brands', async () => {
    // Delete brand if exist
    beforeAll(async () => {
      try {
        await wolkRest.brand().deleteBrand();
      } catch (error) {
        // Brand does not exist
      }
    });

    test('Should create new brand', async () => {
      const { status } = await wolkRest.brand().create(fromResources.brand1);

      expect(status).toEqual(201);
    });
  });

  describe('[PUT] /api/brands', async () => {
    // Create brand to be updated
    beforeAll(async () => {
      try {
        await wolkRest.brand().deleteBrand();
      } catch (error) {
        // Brand already exist
      }

      try {
        await wolkRest.brand().create(fromResources.brand1);
      } catch (error) {
      }
    });

    test('Should update existing brand', async () => {
      const { status } = await wolkRest.brand().update(fromResources.brand2);

      expect(status).toEqual(200);
    });
  });

  describe('[DELETE] /api/brands', async () => {
    // Create brand
    beforeAll(async () => {
      try {
        await wolkRest.brand().deleteBrand();
      } catch (error) {
        // Brand already exist
      }

      try {
        await wolkRest.brand().create(fromResources.brand1);
      } catch (error) {
      }
    });

    test('Should delete existing brand', async () => {
      const { status } = await wolkRest.brand().deleteBrand();

      expect(status).toEqual(200);
    });
  });

});
