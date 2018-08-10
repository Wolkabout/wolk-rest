import { Role } from './Role';
import { Context } from './Context';

export interface ResourceAccess {
  accessToken: string;
  context: Context;
  role: Role;
}
