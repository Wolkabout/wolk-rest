import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import * as fromRoot from '../model';
import * as fromModels from './model';

export default class ReadingTypeApi {
  constructor(private readonly client: Client) {}

  public async getList(
    query?: string,
    queryExclude?: boolean,
    image?: boolean,
    color?: string,
    dataType?: fromModels.DataType,
    dataSize?: number
  ): Promise<fromRoot.WolkResponse<fromModels.ReadingType[]>> {
    const requestConfig: AxiosRequestConfig = {
      data: {},
      headers: {
        Accept: 'application/json'
      }
    };
    try {
      const readingTypes = await this.client.request('GET', '/api/readingTypes', requestConfig);
      return readingTypes;
    } catch (error) {
      throw error;
    }
  }

  public async createUnit(data: fromModels.Unit): Promise<fromRoot.WolkResponse<number>> {
    const requestConfig: AxiosRequestConfig = {
      data
    };

    try {
      const response = await this.client.request(
        'POST',
        `/api/readingTypes/${data.readingTypeId}/units`,
        requestConfig
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
