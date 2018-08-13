import { EndpointType } from './enumeration/EndpointType';

export interface Endpoint {
  enabledRule: boolean;
  enabledMessage: boolean;
  description: string;
  enabledAsset: boolean;
  id: number;
  type: EndpointType;
  value: string;
}
