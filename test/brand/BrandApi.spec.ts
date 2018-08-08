import { expect } from 'chai';
import WolkREST from '../../src';
import environment from '../resources/environment';
import user from '../authentication/resources/user';
import brandMock from './resources/brand';

describe('Brand API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = new WolkREST(environment.baseURL);
    await wolkRest.auth().emailSignIn({
      username: user.valid.email,
      password: user.valid.password
    });
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
        await wolkRest.brand().create(brandMock.BRANDING_1);
      } catch (error) {
      }
    });

    it('Should get existing brand', async () => {
      const { data: brandDetails, status } = await wolkRest.brand().read();

      expect(status).to.equal(200);
      expect(brandDetails).to.deep.include(brandMock.BRANDING_1);
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
      const { status } = await wolkRest.brand().create(brandMock.BRANDING_1);

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
        await wolkRest.brand().create(brandMock.BRANDING_1);
      } catch (error) {
      }
    });

    it('Should update existing brand', async () => {
      const { status } = await wolkRest.brand().update(brandMock.BRANDING_2);

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
        await wolkRest.brand().create(brandMock.BRANDING_1);
      } catch (error) {
      }
    });

    it('Should delete existing brand', async () => {
      const { status } = await wolkRest.brand().deleteBrand();

      expect(status).to.equal(200);
    });
  });

});
