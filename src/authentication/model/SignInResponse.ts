import { User } from './User';
import { ResourceAccess } from './ResourceAccess';

export interface SignInResponse {
  accessList: ResourceAccess[];
  user: User;
  refreshToken: string;
}
