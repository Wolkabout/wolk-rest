import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import * as fromRoot from '../model';
import * as fromModels from './model';

export default class UnitApi {
  constructor(private readonly client: Client) { }

  public async deleteUnit(unitId: number): Promise<fromRoot.WolkResponse<any>> {
    try {
      const response = await this.client.request(
        'DELETE',
        `/api/units/${unitId}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteBulk(unitIds: number[]): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        ids: unitIds.join(',')
      }
    };

    try {
      const response = await this.client.request(
        'DELETE',
        `/api/units`,
        requestConfig
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getList(): Promise<fromRoot.WolkResponse<fromModels.Unit[]>> {
    const unitList = await this.client.request(
      'GET',
      '/api/units'
    );
    return unitList;
  }

  public async getPage({ page, size, sort }: fromModels.UnitQuery = {}):
    Promise<fromRoot.WolkResponse<any>> {

    const requestConfig: AxiosRequestConfig = {
      headers: {
        Accept: 'APPLICATION/VND.PAGE+JSON'
      },
      params: {
        page,
        size,
        sort
      },
    };
    const unitList = await this.client.request(
      'GET',
      '/api/units',
      requestConfig
    );
    return unitList;
  }

}
