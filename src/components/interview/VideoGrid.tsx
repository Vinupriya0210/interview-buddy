import { useEffect, useRef } from 'react';
import { User, VideoOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoGridProps {
  localStream: MediaStream | null;
  isCameraOn: boolean;
  hrName: string;
  isHRConnected?: boolean;
}

export const VideoGrid = ({
  localStream,
  isCameraOn,
  hrName,
  isHRConnected = true,
}: VideoGridProps) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      {/* Student Video - Main Focus */}
      <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-video-bg aspect-video">
        {isCameraOn && localStream ? (
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-green-dark/30 flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-green-soft" />
            </div>
            <p className="text-green-soft text-sm">Camera is off</p>
          </div>
        )}
        
        {/* Label */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
          <span className="text-white text-sm font-medium">You</span>
        </div>
      </div>

      {/* HR Video - Secondary */}
      <div className="relative rounded-2xl overflow-hidden bg-video-bg aspect-video lg:aspect-auto">
        {isHRConnected ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-dark/30 flex items-center justify-center mb-3">
              <User className="w-8 h-8 text-green-soft" />
            </div>
            <p className="text-green-soft text-sm">HR Video</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <VideoOff className="w-8 h-8 text-green-muted mb-2" />
            <p className="text-green-muted text-xs">Waiting for HR...</p>
          </div>
        )}
        
        {/* Label */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
          <span className="text-white text-sm font-medium">{hrName}</span>
        </div>
      </div>
    </div>
  );
};
