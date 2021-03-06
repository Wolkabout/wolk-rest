import { AxiosRequestConfig } from 'axios';
import { Permission, User } from '../authentication/model';
import Client from '../Client';
import * as fromEndpoint from '../endpoint/model';
import * as fromRoot from '../model';
import * as fromModels from './model';

export default class ProfileApi {
  constructor(private readonly client: Client) {}

  public async userUpdateName(data: fromModels.UserUpdateDto): Promise<fromRoot.WolkResponse<User>> {
    const requestConfig: AxiosRequestConfig = {
      data,
      headers: {
        Accept: 'application/vnd.noemail.v1+json'
      }
    };

    try {
      const response = await this.client.request('PUT', '/api/users/me', requestConfig);

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getProfile(): Promise<fromRoot.WolkResponse<User>> {
    try {
      const response = await this.client.request('GET', '/api/users/me');

      return response;
    } catch (error) {
      throw error;
    }
  }

  /* istanbul ignore next */
  public async deleteMe(newCreatorId: number): Promise<fromRoot.WolkResponse<User>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        newCreatorId
      }
    };

    try {
      const response = await this.client.request('DELETE', '/api/users/me', requestConfig);

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async userUpdate(data: fromModels.UserUpdateWithEmailDto): Promise<fromRoot.WolkResponse<User>> {
    const requestConfig: AxiosRequestConfig = {
      data
    };

    try {
      const response = await this.client.request('PUT', '/api/users/me', requestConfig);

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async myEndpoints(
    endpointType: fromEndpoint.EndpointType
  ): Promise<fromRoot.WolkResponse<fromEndpoint.Endpoint[]>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        endpointType
      }
    };

    try {
      const response = await this.client.request('GET', '/api/users/me/endpoints', requestConfig);

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getAccessKey(expirationDate: number): Promise<fromRoot.WolkResponse<fromModels.StringDto>> {
    const requestConfig: AxiosRequestConfig = {
      data: JSON.stringify(expirationDate),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await this.client.request('POST', '/api/users/me/httpPublishingKey', requestConfig);

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async passwordChange(data: fromModels.ChangePasswordRequest): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data
    };

    try {
      const response = await this.client.request('PUT', '/api/users/me/passwordChange', requestConfig);

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async myPermissions(): Promise<fromRoot.WolkResponse<Permission[]>> {
    try {
      const response = await this.client.request('GET', '/api/users/me/permissions');

      return response;
    } catch (error) {
      throw error;
    }
  }
}
