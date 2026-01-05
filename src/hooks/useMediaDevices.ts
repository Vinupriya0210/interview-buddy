import { useState, useCallback, useRef, useEffect } from 'react';

interface MediaDevicesState {
  stream: MediaStream | null;
  isMicOn: boolean;
  isCameraOn: boolean;
  isSpeakerMuted: boolean;
  isScreenSharing: boolean;
  error: string | null;
  permissionStatus: 'pending' | 'granted' | 'denied';
}

export const useMediaDevices = () => {
  const [state, setState] = useState<MediaDevicesState>({
    stream: null,
    isMicOn: true,
    isCameraOn: true,
    isSpeakerMuted: false,
    isScreenSharing: false,
    error: null,
    permissionStatus: 'pending',
  });

  const streamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  const requestPermissions = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      
      streamRef.current = stream;
      setState(prev => ({
        ...prev,
        stream,
        permissionStatus: 'granted',
        error: null,
      }));
      
      return stream;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to access media devices';
      setState(prev => ({
        ...prev,
        permissionStatus: 'denied',
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const toggleMic = useCallback(() => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setState(prev => ({ ...prev, isMicOn: !prev.isMicOn }));
    }
  }, []);

  const toggleCamera = useCallback(() => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setState(prev => ({ ...prev, isCameraOn: !prev.isCameraOn }));
    }
  }, []);

  const toggleSpeaker = useCallback(() => {
    setState(prev => ({ ...prev, isSpeakerMuted: !prev.isSpeakerMuted }));
  }, []);

  const startScreenShare = useCallback(async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      
      screenStreamRef.current = screenStream;
      
      screenStream.getVideoTracks()[0].onended = () => {
        setState(prev => ({ ...prev, isScreenSharing: false }));
        screenStreamRef.current = null;
      };
      
      setState(prev => ({ ...prev, isScreenSharing: true }));
      return screenStream;
    } catch (error) {
      console.error('Screen share error:', error);
      return null;
    }
  }, []);

  const stopScreenShare = useCallback(() => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
      setState(prev => ({ ...prev, isScreenSharing: false }));
    }
  }, []);

  const cleanup = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    ...state,
    requestPermissions,
    toggleMic,
    toggleCamera,
    toggleSpeaker,
    startScreenShare,
    stopScreenShare,
    cleanup,
  };
};
