import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import * as qs from 'qs';
import * as fromRoot from './model';
import { SessionStorage } from './model/SessionStorage';
import { WolkError } from './utils';

export default class Client {
  private readonly _axios: AxiosInstance;
  private readonly _storage!: SessionStorage;

  constructor(baseURL: string, storage: SessionStorage) {
    this._axios = axios.create({
      baseURL,
      paramsSerializer: qs.stringify
    });
    this._storage = storage;
  }

  /**
   * Axios request wrapper
   * @param {String} method Request method
   * @param {String} url Server URL
   * @param {AxiosRequestConfig} requestConfig Custom Axios config https://github.com/axios/axios#request-config
   * @param {Boolean} disableAuthHeader Default FALSE. Optionally disable Authorization header
   */
  public request(
    method: string,
    url: string,
    requestConfig?: AxiosRequestConfig,
    disableAuthHeader: boolean = false
  ): Promise<any> {

    disableAuthHeader ? this.removeAuthHeader() : this.setAuthHeader();

    return new Promise((resolve, rejects) => {
      this._axios.request({
        method,
        url,
        ...requestConfig
      })
        .then((response: fromRoot.WolkResponse<any>) => resolve(response))
        .catch((error: AxiosError) => rejects(new WolkError(error)));
    });
  }

  private setAuthHeader() {
    this._axios.defaults.headers.common.Authorization = this.getToken();
  }

  private removeAuthHeader() {
    delete this._axios.defaults.headers.common.Authorization;
  }

  getToken(): string {
    return this._storage.getToken();
  }

  setToken(token: string): void {
    this._storage.setToken(token);
  }

  clearToken(): void {
    this._storage.clearToken();
  }
}
