import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Shield, Camera, Mic, Info } from 'lucide-react';

interface GuidelinesPanelProps {
  onClose: () => void;
}

export const GuidelinesPanel = ({ onClose }: GuidelinesPanelProps) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-serif font-semibold text-lg">Guidelines</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ×
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Permission Reminder */}
        <Card className="p-4 bg-green-soft/20 border-green-soft">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-green-dark mt-0.5" />
            <div>
              <h4 className="font-medium text-sm mb-1">Before You Begin</h4>
              <p className="text-xs text-green-muted">
                Ensure your camera and microphone are working properly. Test them before the interview starts.
              </p>
            </div>
          </div>
        </Card>

        {/* Requirements */}
        <div>
          <h3 className="font-serif font-medium mb-3 flex items-center gap-2">
            <Camera className="w-4 h-4 text-green-dark" />
            Requirements
          </h3>
          <ul className="space-y-2 text-sm text-green-muted">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-status-live" />
              Stable internet connection
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-status-live" />
              Working camera and microphone
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-status-live" />
              Quiet, well-lit environment
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-status-live" />
              Professional appearance
            </li>
          </ul>
        </div>

        {/* Do's */}
        <div>
          <h3 className="font-serif font-medium mb-3 text-status-live flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Do's
          </h3>
          <ul className="space-y-2 text-sm text-green-muted">
            <li>• Maintain eye contact with the camera</li>
            <li>• Speak clearly and confidently</li>
            <li>• Listen carefully before responding</li>
            <li>• Ask clarifying questions if needed</li>
            <li>• Be honest about your experience</li>
          </ul>
        </div>

        {/* Don'ts */}
        <div>
          <h3 className="font-serif font-medium mb-3 text-destructive flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Don'ts
          </h3>
          <ul className="space-y-2 text-sm text-green-muted">
            <li>• Don't look away frequently</li>
            <li>• Don't interrupt the interviewer</li>
            <li>• Don't use filler words excessively</li>
            <li>• Don't be negative about past employers</li>
            <li>• Don't multitask during the interview</li>
          </ul>
        </div>

        {/* Privacy Notice */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-dark mt-0.5" />
            <div>
              <h4 className="font-medium text-sm mb-1">Privacy Notice</h4>
              <p className="text-xs text-green-muted">
                This interview may be recorded for quality assurance purposes. Your personal data is protected according to our privacy policy.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
