import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { GuidelinesPanel } from './GuidelinesPanel';
import { InterviewDetails } from '@/types/interview';
import { Video, Clock, Building2, User, BookOpen } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface InterviewAccessGateProps {
  interview: InterviewDetails;
  onJoin: () => void;
  onRequestPermissions: () => Promise<MediaStream>;
}

export const InterviewAccessGate = ({
  interview,
  onJoin,
  onRequestPermissions,
}: InterviewAccessGateProps) => {
  const [countdown, setCountdown] = useState<string>('');
  const [isReady, setIsReady] = useState(false);
  const [isCheckingPermissions, setIsCheckingPermissions] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = interview.scheduledTime.getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown('Starting soon...');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setCountdown(`${minutes}m ${seconds}s`);
      } else {
        setCountdown(`${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [interview.scheduledTime]);

  const handleCheckPermissions = async () => {
    setIsCheckingPermissions(true);
    try {
      await onRequestPermissions();
      setIsReady(true);
    } catch (error) {
      console.error('Permission denied:', error);
    } finally {
      setIsCheckingPermissions(false);
    }
  };

  const canJoin = interview.status === 'live' && isReady;

  if (showGuidelines) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-lg p-6 animate-fade-in">
          <GuidelinesPanel onClose={() => setShowGuidelines(false)} />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Guidelines Button - Top Right */}
      <div className="fixed top-4 right-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowGuidelines(true)}
              className="w-10 h-10 rounded-lg"
            >
              <BookOpen className="w-5 h-5 text-green-dark" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View Guidelines</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <Card className="w-full max-w-lg p-8 animate-fade-in">
        {/* Company Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-green-light flex items-center justify-center">
            <Building2 className="w-10 h-10 text-green-dark" />
          </div>
        </div>

        {/* Company & Role Info */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">
            {interview.companyName}
          </h1>
          <p className="text-green-muted text-sm mb-4">HR Interview Session</p>
          <StatusBadge status={interview.status} />
        </div>

        {/* Details */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-green-soft/30 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-dark" />
            </div>
            <div>
              <p className="text-xs text-green-muted">Role</p>
              <p className="font-medium text-foreground">{interview.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-green-soft/30 flex items-center justify-center">
              <User className="w-5 h-5 text-green-dark" />
            </div>
            <div>
              <p className="text-xs text-green-muted">HR Representative</p>
              <p className="font-medium text-foreground">{interview.hrName}</p>
            </div>
          </div>

          {interview.status === 'scheduled' && (
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-green-soft/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-dark" />
              </div>
              <div>
                <p className="text-xs text-green-muted">Starting In</p>
                <p className="font-medium text-foreground font-mono">{countdown}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {!isReady && (
            <Button
              onClick={handleCheckPermissions}
              disabled={isCheckingPermissions}
              variant="outline"
              className="w-full"
            >
              {isCheckingPermissions ? 'Checking...' : 'Enable Camera & Mic'}
            </Button>
          )}

          <Button
            onClick={onJoin}
            disabled={!canJoin}
            className="w-full gap-2"
          >
            <Video className="w-4 h-4" />
            {interview.status === 'live' ? 'Join Interview' : 'Waiting for HR to Start'}
          </Button>

          {!isReady && !isCheckingPermissions && (
            <p className="text-xs text-green-muted text-center">
              Please enable camera and microphone to join
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};
