import { useState, useEffect } from 'react';
import { VideoGrid } from './VideoGrid';
import { VideoControls } from './VideoControls';
import { ConnectionStatus } from './ConnectionStatus';
import { InterviewProgress } from './InterviewProgress';
import { ChatPanel } from './ChatPanel';
import { AITipsPanel } from './AITipsPanel';
import { CandidateProfilePreview } from './CandidateProfilePreview';
import { GuidelinesPanel } from './GuidelinesPanel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { InterviewDetails, CandidateProfile, InterviewStage, ConnectionQuality, ChatMessage } from '@/types/interview';
import { User, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoInterviewSectionProps {
  interview: InterviewDetails;
  candidate: CandidateProfile;
  stage: InterviewStage;
  connectionQuality: ConnectionQuality;
  interviewDuration: number;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  stream: MediaStream | null;
  isMicOn: boolean;
  isCameraOn: boolean;
  isSpeakerMuted: boolean;
  isScreenSharing: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleSpeaker: () => void;
  onToggleScreenShare: () => void;
}

type SidebarPanel = 'profile' | 'guidelines' | null;

export const VideoInterviewSection = ({
  interview,
  candidate,
  stage,
  connectionQuality,
  interviewDuration,
  messages,
  onSendMessage,
  stream,
  isMicOn,
  isCameraOn,
  isSpeakerMuted,
  isScreenSharing,
  onToggleMic,
  onToggleCamera,
  onToggleSpeaker,
  onToggleScreenShare,
}: VideoInterviewSectionProps) => {
  const [activePanel, setActivePanel] = useState<SidebarPanel>(null);

  const handlePanelToggle = (panel: SidebarPanel) => {
    setActivePanel(current => current === panel ? null : panel);
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Left Sidebar - Panel Buttons */}
      <div className="flex">
        {/* Toggle Buttons */}
        <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handlePanelToggle('profile')}
                className={cn(
                  'w-12 h-12 rounded-lg transition-colors',
                  activePanel === 'profile' && 'bg-green-soft/30 text-green-primary'
                )}
              >
                <User className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Your Profile</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handlePanelToggle('guidelines')}
                className={cn(
                  'w-12 h-12 rounded-lg transition-colors',
                  activePanel === 'guidelines' && 'bg-green-soft/30 text-green-primary'
                )}
              >
                <BookOpen className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Guidelines</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Sliding Panel */}
        <div
          className={cn(
            'w-80 bg-card border-r border-border transition-all duration-300 overflow-hidden',
            activePanel ? 'opacity-100' : 'w-0 opacity-0'
          )}
        >
          {activePanel === 'profile' && (
            <CandidateProfilePreview
              candidate={candidate}
              onClose={() => setActivePanel(null)}
            />
          )}
          {activePanel === 'guidelines' && (
            <GuidelinesPanel onClose={() => setActivePanel(null)} />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <div className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
          <div>
            <h1 className="font-serif font-semibold text-foreground">
              {interview.companyName}
            </h1>
            <p className="text-xs text-green-muted">{interview.role} Interview</p>
          </div>

          <ConnectionStatus
            isConnected={interview.status === 'live'}
            quality={connectionQuality}
          />
        </div>

        {/* Video Area */}
        <div className="flex-1 flex">
          {/* Video Grid */}
          <div className="flex-1 flex flex-col">
            <VideoGrid
              localStream={stream}
              isCameraOn={isCameraOn}
              hrName={interview.hrName}
              isHRConnected={true}
            />

            {/* Controls Bar */}
            <div className="h-20 bg-card border-t border-border flex items-center justify-center">
              <VideoControls
                isMicOn={isMicOn}
                isCameraOn={isCameraOn}
                isSpeakerMuted={isSpeakerMuted}
                isScreenSharing={isScreenSharing}
                onToggleMic={onToggleMic}
                onToggleCamera={onToggleCamera}
                onToggleSpeaker={onToggleSpeaker}
                onToggleScreenShare={onToggleScreenShare}
              />
            </div>
          </div>

          {/* Right Sidebar - Chat & Info */}
          <div className="w-80 bg-card border-l border-border flex flex-col">
            {/* Progress */}
            <InterviewProgress
              stage={stage}
              duration={interviewDuration}
              isLive={interview.status === 'live'}
            />

            {/* Chat */}
            <div className="flex-1 border-t border-border">
              <ChatPanel
                messages={messages}
                onSendMessage={onSendMessage}
              />
            </div>

            {/* AI Tips */}
            <div className="p-4 border-t border-border">
              <AITipsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
