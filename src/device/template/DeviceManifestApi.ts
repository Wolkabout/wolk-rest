import { AxiosRequestConfig } from 'axios';
import Client from '../../Client';
import * as fromModels from './model';
import * as fromRoot from '../../model';

export default class DeviceManifestApi {
  constructor(private readonly client: Client) { }

  public async getPublicDeviceManifest(manifestName: string):
    Promise<fromRoot.WolkResponse<fromModels.DeviceManifest>> {

    const requestConfig: AxiosRequestConfig = {
      headers: {
        Accept: 'APPLICATION/VND.DEVICEMANIFEST+JSON'
      },
      params: {
        name: manifestName
      }
    };

    try {
      const deviceManifests = await this.client.request(
        'GET',
        '/api/deviceManifests',
        requestConfig
      );
      return deviceManifests;
    } catch (error) {
      throw error;
    }

  }
}
