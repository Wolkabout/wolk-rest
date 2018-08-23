import { SessionStorage } from '../model/SessionStorage';

export class InMemoryStorage implements SessionStorage {
  private _token: string;

  constructor() {
    this._token = '';
  }

  /**
   * Return token
   * @returns {String} Token
   */
  public getToken(): string {
    return this._token;
  }

  /**
   * Set token
   * @param {String} token Retrieved by register or login
   */
  public setToken(token: string): void {
    this._token = `Bearer ${token}`;
  }

  /**
   * Delete token
   */
  public clearToken(): void {
    this._token = '';
  }
}
