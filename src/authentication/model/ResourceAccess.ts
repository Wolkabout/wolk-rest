import Role from './Role';
import Context from './Context';

interface ResourceAccess {
  accessToken: string;
  context: Context;
  role: Role;
}

export default ResourceAccess;
