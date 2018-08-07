import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import SignInRequest from './model/SignInRequest';
import SignInResponse from './model/SignInResponse';

export default class AuthenticationApi {
  constructor(private readonly client: Client) { }

  public async emailSignIn(data: SignInRequest): Promise<SignInResponse> {
    // Clear client access token
    this.client.token = '';

    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'text/plain, application/vnd.user.v1+json'
      }
    };

    try {
      const response: SignInResponse = await this.client.request(
        'POST',
        '/api/emailSignIn',
        requestConfig
      );

      // Save new access token inside Client's instance
      this.client.token = response.data.accessList[0].accessToken;

      return response;
    } catch (err) {
      throw err;
    }
  }
}
