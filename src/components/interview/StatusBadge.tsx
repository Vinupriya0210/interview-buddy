import { cn } from '@/lib/utils';
import { InterviewStatus } from '@/types/interview';

interface StatusBadgeProps {
  status: InterviewStatus;
  className?: string;
}

const statusConfig = {
  scheduled: {
    label: 'Scheduled',
    className: 'bg-status-scheduled/20 text-amber-700 border-status-scheduled',
  },
  live: {
    label: 'Live',
    className: 'bg-status-live/20 text-green-700 border-status-live',
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-muted/20 text-green-muted border-green-muted',
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full border',
        config.className,
        className
      )}
    >
      {status === 'live' && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-live opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-status-live" />
        </span>
      )}
      {status === 'scheduled' && <span className="h-2 w-2 rounded-full bg-status-scheduled" />}
      {status === 'completed' && <span className="h-2 w-2 rounded-full bg-green-muted" />}
      {config.label}
    </span>
  );
};
