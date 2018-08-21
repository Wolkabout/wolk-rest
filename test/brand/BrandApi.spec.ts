import { expect } from 'chai';
import { WolkREST } from '../../src';
import { getAuthenticatedWolkRestInstance } from '../utils';
import * as fromResources from './resources';

describe('Brand API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[GET] /api/brands', async () => {
    // Create brand
    before(async () => {
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

    it('Should get existing brand', async () => {
      const { data: brandDetails, status } = await wolkRest.brand().read();

      expect(status).to.equal(200);
      expect(brandDetails).to.deep.include(fromResources.brand1);
    });
  });

  context('[POST] /api/brands', async () => {
    // Delete brand if exist
    before(async () => {
      try {
        await wolkRest.brand().deleteBrand();
      } catch (error) {
        // Brand does not exist
      }
    });

    it('Should create new brand', async () => {
      const { status } = await wolkRest.brand().create(fromResources.brand1);

      expect(status).to.equal(201);
    });
  });

  context('[PUT] /api/brands', async () => {
    // Create brand to be updated
    before(async () => {
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

    it('Should update existing brand', async () => {
      const { status } = await wolkRest.brand().update(fromResources.brand2);

      expect(status).to.equal(200);
    });
  });

  context('[DELETE] /api/brands', async () => {
    // Create brand
    before(async () => {
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

    it('Should delete existing brand', async () => {
      const { status } = await wolkRest.brand().deleteBrand();

      expect(status).to.equal(200);
    });
  });

});
