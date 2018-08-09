import { expect } from 'chai';
import WolkREST from '../../src/index';
import environment from '../resources/environment';
import user from '../authentication/resources/user';
import * as fromResources from './resources/index';
import { WolkError } from '../../src/utils';
import { stat } from 'fs';

describe('Widget API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = new WolkREST(environment.baseURL);
    await wolkRest.auth().emailSignIn({
      username: user.valid.email,
      password: user.valid.password
    });
  });

  // context('[POST] /api/dashboard/{dashboardId}/widget', async () => {
  //   it('Should create reading widget on dashboard', async () => {
  //     const { data: widget, status } = await wolkRest.widget().create(
  //       fromResources.dashboardId,
  //       fromResources.readingWidgetData
  //     );

  //     expect(widget).to.not.be.undefined;
  //     expect(status).to.be.equal(201);
  //   });
  // });

  // context('[POST] /api/dashboard/{dashboardId}/widget', async () => {
  //   it('Should not create reading widget on non existing dashboard', async () => {
  //     try {
  //       await wolkRest.widget().create(
  //         0,
  //         fromResources.readingWidgetData
  //       );
  //     } catch ({ code, type }) {
  //       expect(code).to.be.equal(404);
  //       expect(type).to.be.equal('NOT_FOUND');
  //     }
  //   });
  // });

  context('[GET] /api/dashboard/{dashboardId}/widgets/{id}', async () => {
    it('Should get single Widget', async () => {
      try {
        const { data: widget, status } = await wolkRest.widget().read(
          fromResources.dashboardId,
          fromResources.readingWidgetData.id
        );
        expect(status).to.be.equal(200);
        expect(widget.id).to.equal(fromResources.readingWidgetData.id);
      } catch ({ code, type }) {
        expect(code).to.be.equal(404);
      }
    });
  });

});
