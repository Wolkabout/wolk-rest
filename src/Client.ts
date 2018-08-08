import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import * as qs from 'qs';
import WolkResponse from './model/WolkResponse';

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
  public request(
    method: string,
    url: string,
    requestConfig?: AxiosRequestConfig
  ): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.axios.request({
        method,
        url,
        ...requestConfig
      })
        .then((response: WolkResponse<any>) => resolve(response))
        .catch((error: AxiosError) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

          } else if (error.request) {
            // The request was made but no response was received

          } else {
            // Something happened in setting up the request that triggered an Error

          }

          return rejects(error);
        });
    });
  }

  /**
   * Set or Remove token on Axios configuration
   * Call with empty string to delete current token
   * @param token Retrieved by register or login
   */
  set token(token: string) {
    token === ''
     ? delete this.axios.defaults.headers.common.Authorization
     : this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}
