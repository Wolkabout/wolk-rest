import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as qs from 'qs';

export default class Client {
  private readonly axios: AxiosInstance;

  constructor(baseURL: string, requestConfig?: AxiosRequestConfig) {
    this.axios = axios.create({
      baseURL,
      paramsSerializer: qs.stringify,
      ...requestConfig
    });
  }

  /**
   * Axios request
   * @param method Request method
   * @param url Server URL
   * @param requestConfig Custom Axios config https://github.com/axios/axios#request-config
   */
  public async request(
    method: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ): Promise<any> {
    try {
      const response: AxiosResponse = await this.axios.request({
        method,
        url,
        ...requestConfig
      });
      // TODO: perhaps to return the whole response, to cover more things in tests?
      return response.data;
    } catch (err) {
      // throw new Error(error.response.data.message);
      return err.response.data;
    }
  }

  /**
   * Set token on Axios configuration
   * @param token Retrieved by register or login
   */
  public setToken(token: string): void {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  /**
   * Remove token from Axios configuration
   */
  public clearToken(): void {
    delete this.axios.defaults.headers.common.Authorization;
  }
}
