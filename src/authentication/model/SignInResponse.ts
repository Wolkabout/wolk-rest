import { ResourceAccess } from './ResourceAccess';
import { User } from './User';

export interface SignInResponse {
  accessList: ResourceAccess[];
  user: User;
  refreshToken: string;
}
