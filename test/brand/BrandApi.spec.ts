import { expect } from 'chai';
import WolkREST from '../../src';
import environment from '../resources/environment';
import user from '../authentication/resources/user';
import Brand from '../../src/brand/model/Brand';
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
        await wolkRest.brand().create(brandMock.BRANDING_1);
      } catch (err) {
        // Brand already exist
      }
    });

    it('Should get existing brand', async () => {
      const brand: Brand = await wolkRest.brand().read();

      expect(brand).to.deep.include(brandMock.BRANDING_1);
    });
  });

  context('[POST] /api/brands', async () => {
    // Delete brand if exist
    before(async () => {
      try {
        await wolkRest.brand().deleteBrand();
      } catch (err) {
        // Brand does not exist
      }
    });

    it('Should create new brand', async () => {
      const response = await wolkRest.brand().create(brandMock.BRANDING_1);

      expect(response).to.equal('');
    });
  });

  context('[PUT] /api/brands', async () => {
    // Create brand to be updated
    before(async () => {
      try {
        await wolkRest.brand().deleteBrand();
        await wolkRest.brand().create(brandMock.BRANDING_1);
      } catch (err) {
        // Brand already exist
      }
    });

    it('Should update existing brand', async () => {
      const response = await wolkRest.brand().update(brandMock.BRANDING_2);

      expect(response).to.equal('');
    });
  });

  context('[DELETE] /api/brands', async () => {
    // Create brand
    before(async () => {
      try {
        await wolkRest.brand().deleteBrand();
        await wolkRest.brand().create(brandMock.BRANDING_1);
      } catch (err) {
        // Brand already exist
      }
    });

    it('Should delete existing brand', async () => {
      const response = await wolkRest.brand().deleteBrand();

      expect(response).to.equal('');
    });
  });

});
