import { cn } from '@/lib/utils';
import { InterviewStage } from '@/types/interview';
import { StatusBadge } from './StatusBadge';
import { Clock, MessageSquare, User, CheckCircle2 } from 'lucide-react';

interface InterviewProgressProps {
  stage: InterviewStage;
  duration: number;
  isLive: boolean;
}

const stages: { id: InterviewStage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'introduction', label: 'Introduction', icon: User },
  { id: 'hr-discussion', label: 'HR Discussion', icon: MessageSquare },
  { id: 'wrap-up', label: 'Wrap-up', icon: CheckCircle2 },
];

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const InterviewProgress = ({ stage, duration, isLive }: InterviewProgressProps) => {
  const currentIndex = stages.findIndex(s => s.id === stage);

  return (
    <div className="p-4 space-y-4">
      {/* Timer & Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-green-dark" />
          <span className="font-mono text-lg font-medium text-foreground">
            {formatDuration(duration)}
          </span>
        </div>
        <StatusBadge status={isLive ? 'live' : 'completed'} />
      </div>

      {/* Stage Progress */}
      <div className="space-y-2">
        <p className="text-xs text-green-muted font-medium uppercase tracking-wider">
          Interview Stage
        </p>
        <div className="flex items-center gap-2">
          {stages.map((s, index) => {
            const Icon = s.icon;
            const isPast = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={s.id} className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                    isCurrent && 'bg-green-primary text-primary-foreground',
                    isPast && 'bg-green-soft/50 text-green-dark',
                    !isCurrent && !isPast && 'bg-muted text-muted-foreground'
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {s.label}
                </div>
                {index < stages.length - 1 && (
                  <div
                    className={cn(
                      'w-4 h-0.5 rounded-full',
                      isPast ? 'bg-green-soft' : 'bg-muted'
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
