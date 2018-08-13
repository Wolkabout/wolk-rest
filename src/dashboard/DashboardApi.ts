import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import * as fromRoot from '../model';
import * as fromModels from './model';

export default class DashboardApi {
  constructor(private readonly client: Client) { }

  public async list(): Promise<fromRoot.WolkResponse<fromModels.Dashboard[]>> {
    const dashboardsList = await this.client.request(
      'GET',
      '/api/dashboards'
    );
    return dashboardsList;
  }

  public async create(data: { name: string }): Promise<fromRoot.WolkResponse<number>> {
    const requestConfig: AxiosRequestConfig = {
      data
    };
    try {
      const createdDashboardId = await this.client.request(
        'POST',
        '/api/dashboards',
        requestConfig
      );
      return createdDashboardId;
    } catch (error) {
      throw error;
    }
  }

  public async delete(dashboardId: number): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request(
        'DELETE',
        `/api/dashboards/${dashboardId}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async update(dashboardId: number, dashboardName: string): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data: dashboardName,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {

      const response = await this.client.request(
        'PUT',
        `/api/dashboards/${dashboardId}`,
        requestConfig
      );

      return response;

    } catch (error) {
      throw error;
    }
  }

  public async read(dashboardId: number): Promise<fromRoot.WolkResponse<fromModels.Dashboard>> {
    try {
      const response: fromRoot.WolkResponse<fromModels.Dashboard> = await this.client.request(
        'GET',
        `/api/dashboards/${dashboardId}`,
      );
      return response;
    } catch (error) {
      throw error;
    }

  }

  public async listLight(): Promise<fromRoot.WolkResponse<fromModels.DashboardLight[]>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Accept: 'APPLICATION/VND.DASHBOARD.SHORT+JSON'
      }
    };
    try {
      const dashboardsList = await this.client.request(
        'GET',
        '/api/dashboards',
        requestConfig
      );
      return dashboardsList;
    } catch (error) {
      throw (error);
    }
  }

}
