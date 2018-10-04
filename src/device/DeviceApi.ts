import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import * as fromProjections from '../common/Projection';
import * as fromRoot from '../model';
import * as fromModel from './model';
import { ConnectivityType } from './template/model/DeviceManifest';

interface deviceParams {
  state?: string;
  query?: string;
  type?: string;
  connectivityType?: ConnectivityType;
  firmwareUpdateType?: string;
}
export default class DeviceApi {
  private requestMappingUrl = '/api/devices';

  constructor(private readonly client: Client) {}

  /**
   * Used to delete multiple devices at once.
   * @requires DEVICE_DELETE access permision
   */
  public async deleteBulk(deviceIds: number[]): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        ids: deviceIds.join(',')
      }
    };

    try {
      const response = await this.client.request('DELETE', this.requestMappingUrl, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Use to get paged list of devices
   * @requires 'DEVICE_READ'||'DEVICE_CREATE'||'DEVICE_UPDATE'||'DEVICE_DELETE' access permision
   */
  public async listPaged(
    parameters?: deviceParams,
    projection = fromProjections.DeviceProjection.DEVICE_BASIC
  ): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Accept: 'application/vnd.page+json'
      },
      params: {
        ...parameters,
        projection
      }
    };
    try {
      const response = await this.client.request('GET', this.requestMappingUrl, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Use to get lisy of devices
   * @requires 'DEVICE_READ'||'DEVICE_CREATE'||'DEVICE_UPDATE'||'DEVICE_DELETE' access permision
   */
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
      const response = await this.client.request('GET', this.requestMappingUrl, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Use to get number of devices divided by state ONLINE | OFFLINE;
   * @requires 'DEVICE_READ'||'DEVICE_CREATE'||'DEVICE_UPDATE'||'DEVICE_DELETE' access permision
   */
  public async countByState(): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request('GET', `${this.requestMappingUrl}/countByState`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Use to get device number of available slots for devices.
   * @requires 'DEVICE_READ'||'DEVICE_CREATE'||'DEVICE_UPDATE'||'DEVICE_DELETE' access permision
   */
  public async numberOfDevicesUntilLimit(): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request('GET', `${this.requestMappingUrl}/devicesUntilLimit`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Use to get device details by deviceKey.
   * @requires 'DEVICE_READ'||'DEVICE_CREATE'||'DEVICE_UPDATE'||'DEVICE_DELETE' access permision
   */
  public async getDeviceByKey(deviceKey: string): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request('GET', `${this.requestMappingUrl}/${deviceKey}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Use to change device password.
   * @requires DEVICE_UPDATE access permision
   */
  public async generatePassword(deviceKey: string): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request('PUT', `${this.requestMappingUrl}/${deviceKey}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Use to create Standard device.
   * @requires DEVICE_CREATE access permision
   */
  public async create(newDevice: fromModel.DeviceCreationDto): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data: newDevice
    };

    try {
      const response = await this.client.request('POST', `${this.requestMappingUrl}`, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Use to create Jasper device.
   * @requires DEVICE_CREATE access permision
   */
  public async createJasper(newDevice: fromModel.JasperCreationDto): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data: newDevice
    };

    try {
      const response = await this.client.request('POST', `${this.requestMappingUrl}`, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Use to create LoRa device.
   * @requires DEVICE_CREATE access permision
   */
  public async createLoRa(newDevice: fromModel.LoRaCreationDto): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data: newDevice
    };

    try {
      const response = await this.client.request('POST', `${this.requestMappingUrl}`, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Used to create multiple devices at once.
   * @requires DEVICE_CREATE access permision
   */
  public async createBulk(newDevices: fromModel.DeviceCreationDto[]): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data: newDevices,
      headers: {
        'CONTENT-TYPE': 'application/vnd.bulk.operation+json'
      }
    };

    try {
      const response = await this.client.request('POST', `${this.requestMappingUrl}`, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Used to delete single device.
   * @requires DEVICE_DELETE access permision
   */
  public async delete(deviceId: number): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request('DELETE', `${this.requestMappingUrl}/${deviceId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Used to rename device.
   * @requires DEVICE_UPDATE access permision
   */
  public async renameDevice(deviceKey: string, name: string): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data: name,
      headers: { 'Content-Type': 'text/plain' }
    };

    try {
      const response = await this.client.request('PUT', `${this.requestMappingUrl}/${deviceKey}/name`, requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
