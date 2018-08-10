import * as fromRoot from '../model';
import * as fromModels from './model';
import Client from '../Client';

export default class DashboardApi {
  constructor(private readonly client: Client) {}

  public async list(): Promise<fromRoot.WolkResponse<fromModels.Dashboard[]>> {
    const dashboardsList = await this.client.request(
      'GET',
      '/api/dashboards'
    );
    return dashboardsList;
  }
}
