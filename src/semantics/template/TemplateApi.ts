import { AxiosRequestConfig } from 'axios';
import Client from '../../Client';
import * as fromRoot from '../../model';
import * as fromModels from './model';

export default class TemplateApi {
  constructor(private readonly client: Client) {}

  public async getTemplates(query?: string): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        query
      }
    };

    try {
      const response = await this.client.request('GET', '/api/templates', requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getTemplatesShort(): Promise<fromRoot.WolkResponse<fromModels.Template[]>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Accept: 'application/vnd.template.short+json'
      }
    };

    try {
      const response = await this.client.request('GET', '/api/templates', requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getTemplatesPaged(query?: string): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        query
      },
      headers: {
        Accept: 'application/vnd.page+json'
      }
    };

    try {
      const response = await this.client.request('GET', '/api/templates', requestConfig);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async createTemplate(data: fromModels.Template): Promise<fromRoot.WolkResponse<Number>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };
    try {
      const response = await this.client.request('POST', '/api/templates', requestConfig);
      return response;
    } catch (error) {
      throw error;
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
      const response = await this.client.request('PUT', `/api/templates/${data.id}`, requestConfig);

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteTemplate(templateId: Number): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request('DELETE', `/api/templates/${templateId}`);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
