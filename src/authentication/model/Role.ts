import { RoleType } from './enumeration/RoleType';

export interface Role {
  accessPermissions: string[];
  name: string;
  description: string;
  id: number;
  roleType: RoleType;
}
