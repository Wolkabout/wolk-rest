import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import * as qs from 'qs';
import * as fromRoot from './model';
import { SessionStorage } from './model/SessionStorage';
import { SessionStorageConfig } from './model/SessionStorageConfig';
import { supportsLocalStorage, WolkError } from './utils';
import BrowserLocalStorage from './utils/BrowserLocalStorage';
import InMemoryStorage from './utils/InMemoryStorage';

export default class Client {
  private readonly _axios: AxiosInstance;
  private readonly _storage!: SessionStorage;
  private readonly _sessionStorageConfig: SessionStorageConfig;

  constructor(baseURL: string, sessionStorageConfig?: SessionStorageConfig) {
    this._axios = axios.create({
      baseURL,
      paramsSerializer: qs.stringify
    });

    const defaultSessionStorageConfig: SessionStorageConfig = {
      autoSave: true,
      type: 'IN_MEMORY'
    };

    this._sessionStorageConfig = Object.assign(defaultSessionStorageConfig, sessionStorageConfig);

    switch (this._sessionStorageConfig.type) {
      case 'IN_MEMORY':
        this._storage = new InMemoryStorage(this._axios);
        break;

      case 'LOCAL_STORAGE':
        if (!supportsLocalStorage()) break;

        this._storage = new BrowserLocalStorage();
        break;

      case 'CUSTOM':
        if (!this._sessionStorageConfig.custom) break;

        this._storage = this._sessionStorageConfig.custom;
        break;

      default:
        this._storage = new InMemoryStorage(this._axios);
        break;
    }
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

    // Get Token from Browser's Local Storage (if enabled as SessionStorage type)
    if (!disableAuthHeader && this._sessionStorageConfig.type === 'LOCAL_STORAGE') {
      Object.assign(requestConfig, { Headers: { Authorization: this._storage.getToken() } });
    }

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

  getToken(): string {
    return this._storage.getToken();
  }

  setToken(token: string): void {
    this._storage.setToken(token);
  }

  clearToken(): void {
    this._storage.clearToken();
  }

  autoSaveEnabled(): boolean {
    return this._sessionStorageConfig.autoSave;
  }

}
