import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import * as fromRoot from '../model';

export default class DeviceManifestApi {
  constructor(private readonly client: Client) { }

  public async deleteBulk(deviceIds: number[]): Promise <fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        ids: deviceIds.join(',')
      }
    };

    try {
      const response = await this.client.request(
        'DELETE',
        `/api/devices`,
        requestConfig
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
