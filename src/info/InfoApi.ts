import Client from '../Client';
import ServerDetails from './model/ServerDetails';

export default class InfoApi {
  constructor(private readonly client: Client) {}

  public async serverDetails(): Promise<any> {
    const serverDetails: ServerDetails = await this.client.request(
      'GET',
      '/api/infos/server'
    );

    return serverDetails;
  }

  public async availableProtocols(): Promise<any> {
    const availableProtocols: string[] = await this.client.request(
      'GET',
      '/api/infos/availableProtocols'
    );

    return availableProtocols;
  }

  public async signupEnabled(): Promise<any> {
    const signupEnabled: boolean = await this.client.request(
      'GET',
      '/api/infos/signupEnabled'
    );

    return signupEnabled;
  }
}
