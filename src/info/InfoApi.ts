import Client from '../Client';
import { WolkResponse } from '../model/WolkResponse';
import ServerDetails from './model/ServerDetails';

export default class InfoApi {
  constructor(private readonly client: Client) {}

  public async serverDetails(): Promise<WolkResponse<ServerDetails>> {
    try {
      const serverDetails = await this.client.request('GET', '/api/infos/server');
      return serverDetails;
    } catch (error) {
      throw error;
    }
  }

  public async availableProtocols(): Promise<WolkResponse<string[]>> {
    try {
      const availableProtocols = await this.client.request('GET', '/api/infos/availableProtocols');
      return availableProtocols;
    } catch (error) {
      throw error;
    }
  }

  public async signupEnabled(): Promise<WolkResponse<boolean>> {
    try {
      const signupEnabled = await this.client.request('GET', '/api/infos/signupEnabled');

      return signupEnabled;
    } catch (error) {
      throw error;
    }
  }
}
