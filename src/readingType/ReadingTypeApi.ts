import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import DataType from './model/enumeration/DataType';
import ReadingType from './model/ReadingType';

export default class ReadingTypeApi {
  constructor(private readonly client: Client) {}

  public async getList(
    query?: string,
    queryExclude?: boolean,
    image?: boolean,
    color?: string,
    dataType?: DataType,
    dataSize?: number
  ): Promise<ReadingType[]|any> {
    const requestConfig: AxiosRequestConfig = {
      data: {
      },
      headers: {
        Accept: 'application/json'
      }
    };

    const readingTypes: ReadingType[] = await this.client.request(
      'GET',
      '/api/readingTypes',
      requestConfig
    );

    return readingTypes;
  }
}
