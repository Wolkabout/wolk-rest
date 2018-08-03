import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import Brand from './model/Brand';

export default class BrandApi {
  constructor(private readonly client: Client) {}

  public async create(data: Brand): Promise<any> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };

    const response = await this.client.request(
      'POST',
      '/api/brands',
      requestConfig
    );

    return response;
  }

  public async read(): Promise<Brand|any> {
    const brand: Brand = await this.client.request(
      'GET',
      '/api/brands'
    );

    return brand;
  }

  public async update(data: Brand): Promise<any> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };

    const response = await this.client.request(
      'PUT',
      '/api/brands',
      requestConfig
    );

    return response;
  }

  public async deleteBrand(): Promise<any> {
    const response: Brand = await this.client.request(
      'DELETE',
      '/api/brands'
    );

    return response;
  }
}
