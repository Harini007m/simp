export interface Role {
  id: string;
  name: string;
  code: string;
  desc: string;
  description?: string;
  status: 'Active' | 'Inactive';
  modulesCount: number;
  usersCount: number;
  color: string;
  bg: string;
  moduleIds: string[];
  permissions: string[];
  icon?: string | null;
  isActive: boolean;
  is_system?: boolean;
}

export type RoleCreate = Omit<Role, 'id' | 'modulesCount' | 'usersCount' | 'color' | 'bg'>;
export type RoleUpdate = Partial<RoleCreate>;
