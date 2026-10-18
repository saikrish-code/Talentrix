import type { UserRole } from './roles';
import type { UserStatus } from './enums';

// ============================================================
// Auth-related shared types (consumed by NextAuth & API)
// ============================================================

export interface TalentrixUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole;
  tenantId: string | null;
  status: UserStatus;
  emailVerified: Date | null;
}

/** Extends NextAuth Session to include RBAC fields */
export interface TalentrixSession {
  user: TalentrixUser;
  expires: string;
}

/** JWT payload persisted in the NextAuth token */
export interface TalentrixJwtPayload {
  sub: string;         // userId
  email: string;
  role: UserRole;
  tenantId: string | null;
  iat: number;
  exp: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: TalentrixUser;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
