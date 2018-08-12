import { Context } from './Context';
import { Role } from './Role';

export interface ResourceAccess {
  accessToken: string;
  context: Context;
  role: Role;
}
