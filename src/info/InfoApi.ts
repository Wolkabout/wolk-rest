import Client from '../Client';
import ServerDetails from './model/ServerDetails';

export default class InfoApi {
  constructor(private readonly client: Client) {}

  public async serverDetails(): Promise<ServerDetails> {
    const serverDetails: ServerDetails = await this.client.request(
      'GET',
      '/api/infos/server'
    );

    return serverDetails;
  }

  public async availableProtocols(): Promise<string[]> {
    const availableProtocols: string[] = await this.client.request(
      'GET',
      '/api/infos/availableProtocols'
    );

    return availableProtocols;
  }

  public async signupEnabled(): Promise<boolean> {
    const signupEnabled: boolean = await this.client.request(
      'GET',
      '/api/infos/signupEnabled'
    );

    return signupEnabled;
  }
}
