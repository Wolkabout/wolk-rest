import RoleType from './enumeration/RoleType';

interface Role {
  accessPermissions: string[];
  name: string;
  description: string;
  id: number;
  roleType: RoleType;
}

export default Role;
