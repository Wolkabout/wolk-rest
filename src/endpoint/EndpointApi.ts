import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import * as fromRoot from '../model';
import { Endpoint, EndpointType } from './model';

export default class EndpointApi {
  private requestMappingUrl = '/api/endpoints';
  constructor(private readonly client: Client) {}
  public async create(endpoint: Endpoint): Promise<fromRoot.WolkResponse<number>> {
    const requestConfig: AxiosRequestConfig = {
      data: JSON.stringify(endpoint),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await this.client.request('POST', this.requestMappingUrl, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async list(endpointType: EndpointType = 'WEB_SOCKET'): Promise<fromRoot.WolkResponse<Endpoint[]>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Accept: 'application/json'
      },
      params: { endpointType }
    };
    try {
      const response = await this.client.request('GET', this.requestMappingUrl, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async read(endpointId: number): Promise<fromRoot.WolkResponse<Endpoint>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Accept: 'application/json'
      }
    };
    try {
      const response = await this.client.request('GET', `${this.requestMappingUrl}/${endpointId}`, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async delete(endpointId: number): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Accept: 'application/json'
      }
    };
    try {
      const response = await this.client.request('DELETE', `${this.requestMappingUrl}/${endpointId}`, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async update(endpoint: Endpoint, endpointId: number): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data: JSON.stringify(endpoint),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await this.client.request('PUT', `${this.requestMappingUrl}/${endpointId}`, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async extendDuration(endpointId: number): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request('PUT', `${this.requestMappingUrl}/${endpointId}/duration`);
      return response;
    } catch (error) {
      throw error;
    }
  }
  /**
   *  Updates enabledAsset, enabledMessage, enabledRule
   * @param endpoint
   * @param endpointId
   */
  public async updateOptions(body: boolean, endpointId: number): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await this.client.request(
        'PUT',
        `${this.requestMappingUrl}/${endpointId}/options`,
        requestConfig
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
