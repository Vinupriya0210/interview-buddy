import { useState, useEffect, useCallback } from 'react';
import { InterviewDetails, CandidateProfile, InterviewStage, ConnectionQuality, ChatMessage } from '@/types/interview';

// Mock data for demonstration
const mockInterview: InterviewDetails = {
  id: 'int-001',
  companyName: 'TechCorp Solutions',
  companyLogo: 'https://api.dicebear.com/7.x/shapes/svg?seed=techcorp',
  hrName: 'Sarah Johnson',
  role: 'Frontend Developer',
  scheduledTime: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes from now
  status: 'live', // Set to live for demo
};

const mockCandidate: CandidateProfile = {
  id: 'cand-001',
  name: 'Alex Thompson',
  email: 'alex.thompson@email.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
  roleApplied: 'Frontend Developer',
  experienceLevel: 'fresher',
  resumeUrl: '/resume.pdf',
};

export const useInterview = () => {
  const [interview, setInterview] = useState<InterviewDetails>(mockInterview);
  const [candidate, setCandidate] = useState<CandidateProfile>(mockCandidate);
  const [stage, setStage] = useState<InterviewStage>('introduction');
  const [connectionQuality, setConnectionQuality] = useState<ConnectionQuality>('good');
  const [interviewDuration, setInterviewDuration] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Simulate interview status changes
  useEffect(() => {
    if (interview.status === 'live') {
      const interval = setInterval(() => {
        setInterviewDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [interview.status]);

  const joinInterview = useCallback(() => {
    setInterview(prev => ({ ...prev, status: 'live' }));
    setMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'system',
        content: 'You have joined the interview',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const updateStage = useCallback((newStage: InterviewStage) => {
    setStage(newStage);
  }, []);

  const sendMessage = useCallback((content: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate HR response for demo
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'hr',
          content: 'Thank you for your message. Let me note that down.',
          timestamp: new Date(),
        },
      ]);
    }, 2000);
  }, []);

  const completeInterview = useCallback(() => {
    setInterview(prev => ({ ...prev, status: 'completed' }));
    setIsCompleted(true);
  }, []);

  return {
    interview,
    candidate,
    stage,
    connectionQuality,
    interviewDuration,
    isCompleted,
    messages,
    joinInterview,
    updateStage,
    sendMessage,
    completeInterview,
  };
};
