import * as React from 'react';
import { Badge } from '../badge';
import { ApplicationStatus } from '@talentrix/shared-types';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; variant: string }> = {
  [ApplicationStatus.APPLIED]:     { label: 'Applied',     variant: 'info' },
  [ApplicationStatus.SCREENING]:   { label: 'Screening',   variant: 'warning' },
  [ApplicationStatus.SHORTLISTED]: { label: 'Shortlisted', variant: 'success' },
  [ApplicationStatus.INTERVIEW]:   { label: 'Interview',   variant: 'warning' },
  [ApplicationStatus.OFFER]:       { label: 'Offer',       variant: 'success' },
  [ApplicationStatus.HIRED]:       { label: 'Hired',       variant: 'success' },
  [ApplicationStatus.REJECTED]:    { label: 'Rejected',    variant: 'destructive' },
  [ApplicationStatus.WITHDRAWN]:   { label: 'Withdrawn',   variant: 'secondary' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, variant: 'secondary' };
  return (
    // @ts-expect-error — variant prop is typed string but Badge accepts it
    <Badge variant={config.variant} className={cn(className)}>
      {config.label}
    </Badge>
  );
}
