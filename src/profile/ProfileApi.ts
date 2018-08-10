import Client from '../Client';
import * as fromRoot from '../model';
import * as fromModels from './model';
import { Permission, User } from '../authentication/model';
import { AxiosRequestConfig } from 'axios';

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
      const response = await this.client.request(
        'PUT',
        '/api/users/me',
        requestConfig
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getProfile(): Promise<fromRoot.WolkResponse<User>> {
    try {
      const response = await this.client.request(
        'GET',
        '/api/users/me'
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteMe(newCreatorId: number): Promise<fromRoot.WolkResponse<User>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        newCreatorId
      }
    };

    try {
      const response = await this.client.request(
        'DELETE',
        '/api/users/me',
        requestConfig
      );

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
      const response = await this.client.request(
        'PUT',
        '/api/users/me',
        requestConfig
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async myEndpoints(
    endpointType: fromModels.EndpointType
  ): Promise<fromRoot.WolkResponse<fromModels.Endpoint[]>> {
    const requestConfig: AxiosRequestConfig = {
      params: {
        endpointType
      }
    };

    try {
      const response = await this.client.request(
        'GET',
        '/api/users/me/endpoints',
        requestConfig
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  // TODO
  // public async getAccessKey(expirationDate: number): Promise<fromRoot.WolkResponse<fromModels.StringDto>> {
  //   const requestConfig: AxiosRequestConfig = {
  //     data: expirationDate,
  //     headers: {
  //       Accept: 'application/json'
  //     }
  //   };

  //   try {
  //     const response = await this.client.request(
  //       'POST',
  //       '/api/users/me/httpPublishingKey',
  //       requestConfig
  //     );

  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  public async passwordChange(data: fromModels.ChangePasswordRequest): Promise<fromRoot.WolkResponse<any>> {
    const requestConfig: AxiosRequestConfig = {
      data
    };

    try {
      const response = await this.client.request(
        'PUT',
        '/api/users/me/passwordChange',
        requestConfig
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async myPermissions(): Promise<fromRoot.WolkResponse<Permission[]>> {
    try {
      const response = await this.client.request(
        'GET',
        '/api/users/me/permissions'
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
