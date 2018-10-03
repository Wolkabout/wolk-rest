import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import * as fromProjections from '../common/Projection';
import * as fromRoot from '../model';
import { ConnectivityType } from './template/model/DeviceManifest';

interface deviceParams {
  state?: string;
  query?: string;
  type?: string;
  connectivityType?: ConnectivityType;
  firmwareUpdateType?: string;
}

export default class DeviceApi {
  constructor(private readonly client: Client) {}

  public async deleteBulk(deviceIds: number[]): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        ids: deviceIds.join(',')
      }
    };

    try {
      const response = await this.client.request('DELETE', `/api/devices`, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async listPaged(
    parameters?: deviceParams,
    projection = fromProjections.DeviceProjection.DEVICE_BASIC
  ): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        ...parameters,
        projection
      },
      headers: {
        Accept: 'application/vnd.page+json'
      }
    };
    try {
      const response = await this.client.request('GET', `/api/devices`, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async list(
    parameters?: deviceParams,
    projection = fromProjections.DeviceProjection.DEVICE_BASIC
  ): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        ...parameters,
        projection
      }
    };
    try {
      const response = await this.client.request('GET', `/api/devices`, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
