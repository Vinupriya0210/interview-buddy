export type InterviewStatus = 'scheduled' | 'live' | 'completed';

export interface InterviewDetails {
  id: string;
  companyName: string;
  companyLogo: string;
  hrName: string;
  role: string;
  scheduledTime: Date;
  status: InterviewStatus;
}

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  roleApplied: string;
  experienceLevel: 'fresher' | 'experienced';
  resumeUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: 'hr' | 'student' | 'system';
  content: string;
  timestamp: Date;
}

export type InterviewStage = 'introduction' | 'hr-discussion' | 'wrap-up';

export type ConnectionQuality = 'good' | 'medium' | 'poor';
