import { Endpoint } from '../../../src/endpoint/model';

export const webSocketEndpoint: Endpoint = {
  description: 'WEB_SOCKET endpoint',
  enabledAsset: true,
  enabledMessage: true,
  enabledRule: true,
  type: 'WEB_SOCKET',
  value: 'b9ed49a8-e4b1-45bc-bd85-207257f155ab'
};

export const webSocketEndpointUpdate = {
  description: 'WEB_SOCKET endpoint',
  enabledAsset: false,
  enabledMessage: false,
  enabledRule: false,
  type: 'WEB_SOCKET',
  value: 'b9ed49a8-e4b1-45bc-bd85-207257f155ab'
};
