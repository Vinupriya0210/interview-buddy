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
    <div className="p-3 space-y-3">
      {/* Timer & Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-green-dark" />
          <span className="font-mono text-base font-medium text-foreground">
            {formatDuration(duration)}
          </span>
        </div>
        <StatusBadge status={isLive ? 'live' : 'completed'} />
      </div>

      {/* Stage Progress */}
      <div className="space-y-1.5">
        <p className="text-xs text-green-muted font-medium uppercase tracking-wider">
          Stage
        </p>
        <div className="flex items-center gap-1">
          {stages.map((s, index) => {
            const Icon = s.icon;
            const isPast = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={s.id} className="flex items-center gap-1">
                <div
                  className={cn(
                    'flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium transition-colors',
                    isCurrent && 'bg-green-primary text-primary-foreground',
                    isPast && 'bg-green-soft/50 text-green-dark',
                    !isCurrent && !isPast && 'bg-muted text-muted-foreground'
                  )}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {index < stages.length - 1 && (
                  <div
                    className={cn(
                      'w-2 h-0.5 rounded-full',
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
