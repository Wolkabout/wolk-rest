import { AxiosRequestConfig } from 'axios';
import Client from '../../Client';
import Template from './model/Template';

export default class TemplateApi {
  constructor(private readonly client: Client) {}

  public async createTemplate(data: Template): Promise<any> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };

    const response = await this.client.request(
      'POST',
      '/api/templates',
      requestConfig
    );

    return response;
  }
}
