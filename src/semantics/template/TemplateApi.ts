import { AxiosRequestConfig } from 'axios';
import Client from '../../Client';
import * as fromModels from './model';
import * as fromRoot from '../../model';

export default class TemplateApi {
  constructor(private readonly client: Client) { }

  public async createTemplate(data: fromModels.Template): Promise<fromRoot.WolkResponse<number>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };
    try {
      const response = await this.client.request(
        'POST',
        '/api/templates',
        requestConfig
      );
      return response;
    } catch (error) {
      throw (error);
    }
  }

  public async updateTemplate(data: fromModels.Template): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };
    try {
      const response = await this.client.request(
        'PUT',
        `/api/templates/${data.id}`,
        requestConfig
      );

      return response;
    } catch (error) {
      throw (error);
    }
  }

  public async deleteTemplate(templateId: number): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request(
        'DELETE',
        `/api/templates/${templateId}`
      );

      return response;

    } catch (error) {
      throw (error);
    }
  }

}
