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

  const handleJoin = () => {
    joinInterview();
    setHasJoined(true);
  };

  const handleToggleScreenShare = async () => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      await startScreenShare();
    }
  };

  // Show completion screen
  if (isCompleted) {
    return <CompletionScreen companyName={interview.companyName} />;
  }

  // Show interview room after joining
  if (hasJoined && interview.status === 'live') {
    return (
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
    );
  }

  // Show access gate before joining
  return (
    <InterviewAccessGate
      interview={interview}
      onJoin={handleJoin}
      onRequestPermissions={requestPermissions}
    />
  );
};

export default Index;
