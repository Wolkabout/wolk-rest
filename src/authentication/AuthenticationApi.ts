import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import * as fromRoot from '../model';
import * as fromModels from './model';

export default class AuthenticationApi {
  constructor(private readonly client: Client) { }

  public async emailSignIn(data: fromModels.SignInRequest): Promise<fromRoot.WolkResponse<fromModels.SignInResponse>> {
    // Clear client access token
    if (this.client.autoSaveEnabled()) {
      this.client.clearToken();
    }

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
        requestConfig,
        true // Disable Authorization header
      );

      // Save new access token inside client instance
      if (this.client.autoSaveEnabled()) {
        this.client.setToken(authResponse.data.accessList[0].accessToken);
      }

      return authResponse;
    } catch (error) {
      throw error;
    }
  }
}
