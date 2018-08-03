import User from './User';
import ResourceAccess from './ResourceAccess';

interface SignInResponse {
  accessList: ResourceAccess[];
  user: User;
  refreshToken: string;
}

export default SignInResponse;
