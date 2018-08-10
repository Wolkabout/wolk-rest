import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import * as fromRoot from '../model';
import * as fromModels from './model';

export default class WidgetApi {
  constructor(private readonly client: Client) { }

  public async create(dashboardId: number, data: fromModels.Widget): Promise<fromRoot.WolkResponse<number>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };
    try {
      const response = await this.client.request(
        'POST',
        `/api/dashboards/${dashboardId}/widgets`,
        requestConfig
      );
      return response;
    } catch (error) {
      throw error;
    }

  }

  public async read(dashboardId: number, widgetId: number): Promise<fromRoot.WolkResponse<fromModels.Widget>> {
    try {
      const response: fromRoot.WolkResponse<fromModels.Widget> = await this.client.request(
        'GET',
        `/api/dashboards/${dashboardId}/widgets/${widgetId}`,
      );
      return response;
    } catch (error) {
      throw error;
    }

  }

  public async delete(dashboardId: number, id: number): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request(
        'DELETE',
        `/api/dashboards/${dashboardId}/widgets/${id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async update(dashboardId: number, data: fromModels.Widget): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };

    try {

      const response = await this.client.request(
        'PUT',
        `/api/dashboards/${dashboardId}/widgets/${data.id}`,
        requestConfig
      );

      return response;

    } catch (error) {
      throw error;
    }
  }

  public async updateBulk(dashboardId: number, data: fromModels.Widget[]): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };

    try {

      const response = await this.client.request(
        'PUT',
        `/api/dashboards/${dashboardId}/widgets/`,
        requestConfig
      );

      return response;

    } catch (error) {
      throw error;
    }
  }

}
