import type { UserRole } from './roles';
import type { UserStatus } from './enums';

// ============================================================
// User domain types
// ============================================================

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl: string | null;
  tenantId: string | null;
  department: string | null;
  title: string | null;
  phone: string | null;
  createdAt: string; // ISO string
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  name: string;
  role: UserRole;
  password?: string; // omitted for SSO users
  tenantId?: string;
  department?: string;
  title?: string;
}

export interface UpdateUserDto {
  name?: string;
  role?: UserRole;
  status?: UserStatus;
  department?: string;
  title?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface InviteUserDto {
  email: string;
  role: UserRole;
  name?: string;
}
