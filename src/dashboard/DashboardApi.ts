import Client from '../Client';
import Dashboard from './model/Dashboard';

export default class DashboardApi {
  constructor(private readonly client: Client) {}

  public async list(): Promise<any> {
    const dashboardsList: Dashboard[] = await this.client.request(
      'GET',
      '/api/dashboards'
    );

    return dashboardsList;
  }
}
