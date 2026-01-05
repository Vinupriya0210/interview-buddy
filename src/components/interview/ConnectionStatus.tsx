import { cn } from '@/lib/utils';
import { ConnectionQuality } from '@/types/interview';
import { Wifi, WifiOff } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  quality: ConnectionQuality;
}

const qualityConfig = {
  good: { label: 'Good', color: 'bg-status-live' },
  medium: { label: 'Medium', color: 'bg-status-scheduled' },
  poor: { label: 'Poor', color: 'bg-destructive' },
};

export const ConnectionStatus = ({ isConnected, quality }: ConnectionStatusProps) => {
  const config = qualityConfig[quality];

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border">
        <WifiOff className="w-4 h-4 text-destructive" />
        <span className="text-sm text-destructive">Connecting...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border">
      <Wifi className="w-4 h-4 text-green-dark" />
      <span className="text-sm text-foreground">Live with HR</span>
      <div className="flex items-center gap-1 ml-2">
        <div
          className={cn(
            'w-2 h-2 rounded-full',
            config.color
          )}
        />
        <span className="text-xs text-green-muted">{config.label}</span>
      </div>
    </div>
  );
};
