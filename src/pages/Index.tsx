import { useState, useEffect } from 'react';
import { InterviewAccessGate } from '@/components/interview/InterviewAccessGate';
import { VideoInterviewSection } from '@/components/interview/VideoInterviewSection';
import { CompletionScreen } from '@/components/interview/CompletionScreen';
import { useInterview } from '@/hooks/useInterview';
import { useMediaDevices } from '@/hooks/useMediaDevices';
import { Button } from '@/components/ui/button';

const Index = () => {
  const {
    interview,
    candidate,
    stage,
    connectionQuality,
    interviewDuration,
    isCompleted,
    messages,
    joinInterview,
    sendMessage,
    completeInterview,
  } = useInterview();

  const {
    stream,
    isMicOn,
    isCameraOn,
    isSpeakerMuted,
    isScreenSharing,
    permissionStatus,
    requestPermissions,
    toggleMic,
    toggleCamera,
    toggleSpeaker,
    startScreenShare,
    stopScreenShare,
  } = useMediaDevices();

  const [hasJoined, setHasJoined] = useState(false);
  const [demoScreen, setDemoScreen] = useState<'gate' | 'interview' | 'completion'>('gate');

  const handleJoin = () => {
    joinInterview();
    setHasJoined(true);
    setDemoScreen('interview');
  };

  const handleToggleScreenShare = async () => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      await startScreenShare();
    }
  };

  // Demo Controls - Remove in production
  const DemoControls = () => (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border">
      <span className="text-xs text-green-muted self-center mr-2">Demo:</span>
      <Button
        size="sm"
        variant={demoScreen === 'gate' ? 'default' : 'outline'}
        onClick={() => { setDemoScreen('gate'); setHasJoined(false); }}
        className="text-xs"
      >
        Gate
      </Button>
      <Button
        size="sm"
        variant={demoScreen === 'interview' ? 'default' : 'outline'}
        onClick={() => { setDemoScreen('interview'); setHasJoined(true); }}
        className="text-xs"
      >
        Interview
      </Button>
      <Button
        size="sm"
        variant={demoScreen === 'completion' ? 'default' : 'outline'}
        onClick={() => setDemoScreen('completion')}
        className="text-xs"
      >
        Complete
      </Button>
    </div>
  );

  // Show completion screen
  if (demoScreen === 'completion' || isCompleted) {
    return (
      <>
        <CompletionScreen companyName={interview.companyName} />
        <DemoControls />
      </>
    );
  }

  // Show interview room after joining
  if (demoScreen === 'interview' || (hasJoined && interview.status === 'live')) {
    return (
      <>
        <VideoInterviewSection
          interview={interview}
          candidate={candidate}
          stage={stage}
          connectionQuality={connectionQuality}
          interviewDuration={interviewDuration}
          messages={messages}
          onSendMessage={sendMessage}
          stream={stream}
          isMicOn={isMicOn}
          isCameraOn={isCameraOn}
          isSpeakerMuted={isSpeakerMuted}
          isScreenSharing={isScreenSharing}
          onToggleMic={toggleMic}
          onToggleCamera={toggleCamera}
          onToggleSpeaker={toggleSpeaker}
          onToggleScreenShare={handleToggleScreenShare}
        />
        <DemoControls />
      </>
    );
  }

  // Show access gate before joining
  return (
    <>
      <InterviewAccessGate
        interview={interview}
        onJoin={handleJoin}
        onRequestPermissions={requestPermissions}
      />
      <DemoControls />
    </>
  );
};

export default Index;
