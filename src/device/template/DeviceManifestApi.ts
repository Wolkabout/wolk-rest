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

  public async listDeviceManifestsShort():
    Promise<fromRoot.WolkResponse<{name: string, id: number}[]>> {

    const requestConfig: AxiosRequestConfig = {
      headers: {
        Accept: 'APPLICATION/VND.MANIFEST.SHORT+JSON'
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

  public async createManifest(data: fromModels.DeviceManifest): Promise<fromRoot.WolkResponse<number>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };
    try {
      const response = await this.client.request(
        'POST',
        `/api/deviceManifests`,
        requestConfig
      );
      return response;
    } catch (error) {
      throw error;
    }

  }

  public async deleteManifest(manifestId: number): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request(
        'DELETE',
        `/api/deviceManifests/${manifestId}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async updateDeviceManifest(data: fromModels.DeviceManifest): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };

    try {

      const response = await this.client.request(
        'PUT',
        `/api/deviceManifests/${data.id}`,
        requestConfig
      );

      return response;

    } catch (error) {
      throw error;
    }
  }

}
