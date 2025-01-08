import { Role } from './role';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
};
