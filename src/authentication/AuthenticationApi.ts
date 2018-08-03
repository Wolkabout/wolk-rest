import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import SignInRequest from './model/SignInRequest';
import SignInResponse from './model/SignInResponse';

export default class AuthenticationApi {
  constructor(private readonly client: Client) {}

  public async emailSignIn(data: SignInRequest): Promise<SignInResponse|any> {
    // Clear client access token
    this.client.clearToken();

    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'text/plain, application/vnd.user.v1+json'
      }
    };

    const authentication: SignInResponse = await this.client.request(
      'POST',
      '/api/emailSignIn',
      requestConfig
    );

    // TODO: Check if authentication success, then setToken
    // Persist client access token
    try {
      this.client.setToken(authentication.accessList[0].accessToken);
    } catch (err) {
      //
    }

    return authentication;
  }
}
