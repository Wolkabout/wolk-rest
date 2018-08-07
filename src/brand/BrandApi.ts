import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Client from '../Client';
import Brand from './model/Brand';
import BrandResponse from './model/BrandResponse';

export default class BrandApi {
  constructor(private readonly client: Client) { }

  public async create(brandDto: Brand): Promise<AxiosResponse> {
    const requestConfig: AxiosRequestConfig = {
      data: brandDto,
      headers: {
        Accept: 'application/json'
      }
    };

    return await this.client.request(
      'POST',
      '/api/brands',
      requestConfig
    );
  }

  public async read(): Promise<BrandResponse> {
    return await this.client.request(
      'GET',
      '/api/brands'
    );
  }

  public async update(brandDto: Brand): Promise<AxiosResponse> {
    const requestConfig: AxiosRequestConfig = {
      data: brandDto,
      headers: {
        Accept: 'application/json'
      }
    };

    return await this.client.request(
      'PUT',
      '/api/brands',
      requestConfig
    );
  }

  public async deleteBrand(): Promise<AxiosResponse> {
    return await this.client.request(
      'DELETE',
      '/api/brands'
    );
  }
}
