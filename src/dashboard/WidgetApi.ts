import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import Widget from './model/Widget';
import WolkResponse from '../model/WolkResponse';

export default class WidgetApi {
  constructor(private readonly client: Client) { }

  public async create(dashboardId: number, data: Widget): Promise<WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/json'
      }
    };

    const response = await this.client.request(
      'POST',
      `/api/dashboards/${dashboardId}/widgets`,
      requestConfig
    );

    return response;
  }
}
