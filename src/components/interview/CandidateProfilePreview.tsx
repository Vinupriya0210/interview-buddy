import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CandidateProfile } from '@/types/interview';
import { Mail, Phone, FileText, Briefcase, GraduationCap } from 'lucide-react';
import { ResumeModal } from './ResumeModal';

interface CandidateProfilePreviewProps {
  candidate: CandidateProfile;
  onClose: () => void;
}

export const CandidateProfilePreview = ({
  candidate,
  onClose,
}: CandidateProfilePreviewProps) => {
  const [showResume, setShowResume] = useState(false);

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-serif font-semibold text-lg">Your Profile</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ×
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-green-light flex items-center justify-center mb-4">
            <span className="text-3xl font-serif font-semibold text-green-dark">
              {candidate.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="font-serif font-semibold text-xl text-foreground">
            {candidate.name}
          </h3>
          <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 text-xs font-medium rounded-full bg-green-soft/30 text-green-dark">
            {candidate.experienceLevel === 'fresher' ? (
              <>
                <GraduationCap className="w-3 h-3" />
                Fresher
              </>
            ) : (
              <>
                <Briefcase className="w-3 h-3" />
                Experienced
              </>
            )}
          </span>
        </div>

        {/* Details */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-soft/30 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-green-dark" />
            </div>
            <div>
              <p className="text-xs text-green-muted">Role Applied</p>
              <p className="font-medium text-sm">{candidate.roleApplied}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-soft/30 flex items-center justify-center">
              <Mail className="w-4 h-4 text-green-dark" />
            </div>
            <div>
              <p className="text-xs text-green-muted">Email</p>
              <p className="font-medium text-sm">{candidate.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-soft/30 flex items-center justify-center">
              <Phone className="w-4 h-4 text-green-dark" />
            </div>
            <div>
              <p className="text-xs text-green-muted">Phone</p>
              <p className="font-medium text-sm">{candidate.phone}</p>
            </div>
          </div>
        </Card>

        {/* Resume */}
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => setShowResume(true)}
        >
          <FileText className="w-4 h-4" />
          View Resume
        </Button>

        <p className="text-xs text-green-muted text-center">
          This information is read-only and cannot be edited during the interview.
        </p>
      </div>

      <ResumeModal
        candidate={candidate}
        open={showResume}
        onClose={() => setShowResume(false)}
      />
    </div>
  );
};
