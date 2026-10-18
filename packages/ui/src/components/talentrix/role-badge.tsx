import * as React from 'react';
import { Badge } from '../badge';
import { UserRole } from '@talentrix/shared-types';

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
}

const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]:          'Admin',
  [UserRole.HR_MANAGER]:     'HR Manager',
  [UserRole.RECRUITER]:      'Recruiter',
  [UserRole.HIRING_MANAGER]: 'Hiring Manager',
  [UserRole.INTERVIEWER]:    'Interviewer',
  [UserRole.CANDIDATE]:      'Candidate',
};

export function RoleBadge({ role, className }: RoleBadgeProps) {
  return (
    <Badge variant="outline" className={className}>
      {ROLE_LABELS[role]}
    </Badge>
  );
}
