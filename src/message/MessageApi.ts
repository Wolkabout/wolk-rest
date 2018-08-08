import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import WolkResponse from '../model/WolkResponse';
import PageOfMessage from './model/PageOfMessage';

export default class MessageApi {
  constructor(private readonly client: Client) { }

  public async pageMessages(
    since?: number,
    to?: number,
    type?: string,
    query?: string,
    read?: boolean
  ): Promise<WolkResponse<PageOfMessage>> {

    const requestConfig: AxiosRequestConfig = {
      data: {
        since,
        to,
        type,
        query,
        read
      },
      headers: {
        Accept: 'application/json'
      }
    };

    try {
      const response = await this.client.request(
        'GET',
        '/api/messages',
        requestConfig
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
