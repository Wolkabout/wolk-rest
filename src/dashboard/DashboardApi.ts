import WolkResponse from './../model/WolkResponse';
import Client from '../Client';
import Dashboard from './model/Dashboard';

export default class DashboardApi {
  constructor(private readonly client: Client) {}

  public async list(): Promise<WolkResponse<Dashboard[]>> {
    const dashboardsList = await this.client.request(
      'GET',
      '/api/dashboards'
    );

    return dashboardsList;
  }
}
