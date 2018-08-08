import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import SignInRequest from './model/SignInRequest';
import SignInResponse from './model/SignInResponse';
import WolkResponse from '../model/WolkResponse';

export default class AuthenticationApi {
  constructor(private readonly client: Client) { }

  public async emailSignIn(data: SignInRequest): Promise<WolkResponse<SignInResponse>> {
    // Clear client access token
    this.client.token = '';

    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'text/plain, application/vnd.user.v1+json'
      }
    };

    try {
      const authResponse = await this.client.request(
        'POST',
        '/api/emailSignIn',
        requestConfig
      );

      // Save new access token inside client instance
      this.client.token = authResponse.data.accessList[0].accessToken;

      return authResponse;
    } catch (err) {
      throw err;
    }
  }
}
