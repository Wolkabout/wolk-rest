import User from './User';
import ResourceAccess from './ResourceAccess';
import { AxiosResponse } from 'axios';

interface SignInResponse extends AxiosResponse {
  data: {
    accessList: ResourceAccess[];
    user: User;
    refreshToken: string;
  };
}

export default SignInResponse;
