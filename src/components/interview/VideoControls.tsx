import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Monitor, MonitorOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoControlsProps {
  isMicOn: boolean;
  isCameraOn: boolean;
  isSpeakerMuted: boolean;
  isScreenSharing: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleSpeaker: () => void;
  onToggleScreenShare: () => void;
}

export const VideoControls = ({
  isMicOn,
  isCameraOn,
  isSpeakerMuted,
  isScreenSharing,
  onToggleMic,
  onToggleCamera,
  onToggleSpeaker,
  onToggleScreenShare,
}: VideoControlsProps) => {
  const controls = [
    {
      icon: isMicOn ? Mic : MicOff,
      label: isMicOn ? 'Mute' : 'Unmute',
      isActive: isMicOn,
      onClick: onToggleMic,
    },
    {
      icon: isCameraOn ? Video : VideoOff,
      label: isCameraOn ? 'Turn off camera' : 'Turn on camera',
      isActive: isCameraOn,
      onClick: onToggleCamera,
    },
    {
      icon: isSpeakerMuted ? VolumeX : Volume2,
      label: isSpeakerMuted ? 'Unmute speaker' : 'Mute speaker',
      isActive: !isSpeakerMuted,
      onClick: onToggleSpeaker,
    },
    {
      icon: isScreenSharing ? MonitorOff : Monitor,
      label: isScreenSharing ? 'Stop sharing' : 'Share screen',
      isActive: isScreenSharing,
      onClick: onToggleScreenShare,
      highlight: isScreenSharing,
    },
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {controls.map(({ icon: Icon, label, isActive, onClick, highlight }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              onClick={onClick}
              className={cn(
                'w-12 h-12 rounded-full transition-all duration-200',
                isActive
                  ? 'bg-green-dark/20 text-green-dark hover:bg-green-dark/30'
                  : 'bg-destructive/20 text-destructive hover:bg-destructive/30',
                highlight && 'ring-2 ring-status-live ring-offset-2 ring-offset-card'
              )}
            >
              <Icon className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}

      {/* End Call - Disabled for students */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            disabled
            className="w-12 h-12 rounded-full bg-muted text-muted-foreground cursor-not-allowed"
          >
            <span className="text-xs">End</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Only HR can end the interview</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
