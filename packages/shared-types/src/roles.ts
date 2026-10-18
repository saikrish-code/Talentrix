// ============================================================
// RBAC — Role definitions & permissions
// ============================================================

export enum UserRole {
  ADMIN = 'ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  RECRUITER = 'RECRUITER',
  HIRING_MANAGER = 'HIRING_MANAGER',
  INTERVIEWER = 'INTERVIEWER',
  CANDIDATE = 'CANDIDATE',
}

/**
 * Fine-grained permission actions used throughout the platform.
 * Format: resource:action
 */
export type Permission =
  // User management
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'users:invite'
  // Jobs
  | 'jobs:read'
  | 'jobs:create'
  | 'jobs:update'
  | 'jobs:delete'
  | 'jobs:publish'
  | 'jobs:archive'
  // Applications
  | 'applications:read'
  | 'applications:update'
  | 'applications:delete'
  | 'applications:move_stage'
  // Interviews
  | 'interviews:read'
  | 'interviews:schedule'
  | 'interviews:update'
  | 'interviews:feedback'
  // Reports & Analytics
  | 'reports:read'
  | 'reports:export'
  // AI features
  | 'ai:resume_parse'
  | 'ai:jd_generate'
  | 'ai:match_score'
  | 'ai:interview_questions'
  // Settings
  | 'settings:read'
  | 'settings:write'
  // Candidates (self-service)
  | 'candidate:profile'
  | 'candidate:apply'
  | 'candidate:status';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    'users:read', 'users:write', 'users:delete', 'users:invite',
    'jobs:read', 'jobs:create', 'jobs:update', 'jobs:delete', 'jobs:publish', 'jobs:archive',
    'applications:read', 'applications:update', 'applications:delete', 'applications:move_stage',
    'interviews:read', 'interviews:schedule', 'interviews:update', 'interviews:feedback',
    'reports:read', 'reports:export',
    'ai:resume_parse', 'ai:jd_generate', 'ai:match_score', 'ai:interview_questions',
    'settings:read', 'settings:write',
  ],
  [UserRole.HR_MANAGER]: [
    'users:read', 'users:invite',
    'jobs:read', 'jobs:create', 'jobs:update', 'jobs:publish', 'jobs:archive',
    'applications:read', 'applications:update', 'applications:move_stage',
    'interviews:read', 'interviews:schedule', 'interviews:update', 'interviews:feedback',
    'reports:read', 'reports:export',
    'ai:resume_parse', 'ai:jd_generate', 'ai:match_score', 'ai:interview_questions',
    'settings:read',
  ],
  [UserRole.RECRUITER]: [
    'jobs:read', 'jobs:create', 'jobs:update',
    'applications:read', 'applications:update', 'applications:move_stage',
    'interviews:read', 'interviews:schedule', 'interviews:update', 'interviews:feedback',
    'reports:read',
    'ai:resume_parse', 'ai:jd_generate', 'ai:match_score', 'ai:interview_questions',
  ],
  [UserRole.HIRING_MANAGER]: [
    'jobs:read', 'jobs:create', 'jobs:update',
    'applications:read', 'applications:update', 'applications:move_stage',
    'interviews:read', 'interviews:schedule', 'interviews:feedback',
    'reports:read',
    'ai:match_score',
  ],
  [UserRole.INTERVIEWER]: [
    'applications:read',
    'interviews:read', 'interviews:feedback',
    'ai:interview_questions',
  ],
  [UserRole.CANDIDATE]: [
    'candidate:profile', 'candidate:apply', 'candidate:status',
  ],
};

/** Check if a role has a given permission */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
