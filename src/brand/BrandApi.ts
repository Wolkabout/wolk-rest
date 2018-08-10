import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import * as fromRoot from '../model';
import * as fromModels from './model';

export default class BrandApi {
  constructor(private readonly client: Client) {}

  public async create(data: fromModels.Brand): Promise<fromRoot.WolkResponse<string>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };

    try {
      const response = await this.client.request(
        'POST',
        '/api/brands',
        requestConfig
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async read(): Promise<fromRoot.WolkResponse<fromModels.Brand>> {
    try {
      const brand = await this.client.request(
        'GET',
        '/api/brands'
      );

      return brand;
    } catch (error) {
      throw error;
    }
  }

  public async update(data: fromModels.Brand): Promise<fromRoot.WolkResponse<string>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };

    try {
      const response = await this.client.request(
        'PUT',
        '/api/brands',
        requestConfig
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteBrand(): Promise<fromRoot.WolkResponse<string>> {
    try {
      const response = await this.client.request(
        'DELETE',
        '/api/brands'
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
