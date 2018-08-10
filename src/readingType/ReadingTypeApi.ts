import { AxiosRequestConfig } from 'axios';
import * as fromModels from './model';
import * as fromRoot from '../model';
import Client from '../Client';

export default class ReadingTypeApi {
  constructor(private readonly client: Client) { }

  public async getList(
    query?: string,
    queryExclude?: boolean,
    image?: boolean,
    color?: string,
    dataType?: fromModels.DataType,
    dataSize?: number
  ): Promise<fromRoot.WolkResponse<fromModels.ReadingType[]>> {
    const requestConfig: AxiosRequestConfig = {
      data: {
      },
      headers: {
        Accept: 'application/json'
      }
    };
    try {
      const readingTypes = await this.client.request(
        'GET',
        '/api/readingTypes',
        requestConfig
      );
      return readingTypes;
    } catch (error) {
      throw error;
    }
  }
}
