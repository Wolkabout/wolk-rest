import { AxiosRequestConfig } from 'axios';
import Client from '../../Client';
import DeviceManifest from './model/DeviceManifest';

export default class DeviceManifestApi {
  constructor(private readonly client: Client) { }

  public async getPublicDeviceManifest(manifestName: string): Promise<DeviceManifest> {

    const requestConfig: AxiosRequestConfig = {
      headers: {
        Accept: 'APPLICATION/VND.DEVICEMANIFEST+JSON'
      },
      params: {
        name: manifestName
      }
    };

    const deviceManifests: DeviceManifest = await this.client.request(
      'GET',
      '/api/deviceManifests',
      requestConfig
    );

    return deviceManifests;
  }
}
