import { AxiosInstance } from 'axios';
import { SessionStorage } from '../model/SessionStorage';

export default class InMemoryStorage implements SessionStorage {
  private readonly _axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  /**
   * Get Axios Authorization header
   * @returns {String} Token
   */
  public getToken(): string {
    return this._axios.defaults.headers.common.Authorization || '';
  }

  /**
   * Set token on Axios Authorization header
   * @param {String} token Retrieved by register or login
   */
  public setToken(token: string): void {
    this._axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  /**
   * Delete token from Axios Authorization header
   */
  public clearToken(): void {
    delete this._axios.defaults.headers.common.Authorization;
  }
}
