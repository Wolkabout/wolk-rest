import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import { WolkResponse } from '../model/WolkResponse';
import PageOfMessage from './model/PageOfMessage';
import Message from './model/Message';

export default class MessageApi {
  constructor(private readonly client: Client) { }

  public async pageMessages({ since, to, type,  query,  read }:
    {
      since?: number,
      to?: number,
      type?: string,
      query?: string,
      read?: boolean
    } = {}): Promise<WolkResponse<PageOfMessage>> {

    const requestConfig: AxiosRequestConfig = {
      params: {
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

  public async unreadAlarms(): Promise<WolkResponse<Message[]>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Accept: 'application/vnd.unread.alarms+json'
      }
    };

    try {
      const messages = await this.client.request(
        'GET',
        '/api/messages',
        requestConfig
      );

      return messages;
    } catch (error) {
      throw error;
    }
  }

  public async countUnreadAlarms(): Promise<WolkResponse<number>> {
    const requestConfig: AxiosRequestConfig = {
      data: {
        type: 'ALARM'
      }
    };

    try {
      const unreadAlarmsCount = await this.client.request(
        'GET',
        '/api/messages/unreadCount',
        requestConfig
      );

      return unreadAlarmsCount;
    } catch (error) {
      throw error;
    }
  }

  public async markAsRead(messageKeys: string[]): Promise<WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data: [...messageKeys]
    };

    try {
      const response = await this.client.request(
        'PUT',
        '/api/messages/markAsRead',
        requestConfig
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async markAsReadAll(): Promise<WolkResponse<any>> {
    try {
      const response = await this.client.request(
        'PUT',
        '/api/messages/markAsReadAll'
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
