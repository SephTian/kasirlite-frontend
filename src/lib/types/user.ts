import { Role } from './role';

export type User = {
  id: number | bigint;
  roleId: number | bigint;
  name: string;
  email: string;
  password: string;
  role: Role;
};
