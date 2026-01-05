import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Mail, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompletionScreenProps {
  companyName: string;
}

export const CompletionScreen = ({ companyName }: CompletionScreenProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitFeedback = () => {
    // In production, this would send feedback to the server
    console.log('Feedback submitted:', { rating, feedback });
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-lg p-8 text-center animate-fade-in">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-status-live/20 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-status-live" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">
          Interview Completed!
        </h1>
        <p className="text-green-muted mb-8">
          Your HR interview with {companyName} has been completed successfully.
        </p>

        {/* Next Steps */}
        <Card className="p-4 mb-6 text-left bg-background">
          <h3 className="font-serif font-medium mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-green-dark" />
            What's Next?
          </h3>
          <ul className="space-y-3 text-sm text-green-muted">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-soft/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-green-dark">1</span>
              </div>
              <span>Our team will review your interview performance</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-soft/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-green-dark">2</span>
              </div>
              <span>You will receive the result via email</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-soft/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-3 h-3 text-green-dark" />
              </div>
              <span>Expected response time: 2-5 working days</span>
            </li>
          </ul>
        </Card>

        {/* Optional Feedback */}
        {!isSubmitted ? (
          <div className="space-y-4">
            <h3 className="font-serif font-medium text-left">
              Rate Your Experience (Optional)
            </h3>
            
            {/* Star Rating */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      'w-8 h-8 transition-colors',
                      (hoveredRating || rating) >= star
                        ? 'fill-status-scheduled text-status-scheduled'
                        : 'text-muted'
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Comment Box */}
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your interview experience (optional)..."
              className="resize-none"
              rows={3}
            />

            <Button
              onClick={handleSubmitFeedback}
              disabled={!rating}
              className="w-full"
            >
              Submit Feedback
            </Button>

            <p className="text-xs text-green-muted">
              Your feedback helps us improve. It is not visible to the interviewer.
            </p>
          </div>
        ) : (
          <Card className="p-4 bg-status-live/10 border-status-live/30">
            <CheckCircle2 className="w-6 h-6 text-status-live mx-auto mb-2" />
            <p className="text-sm text-foreground">
              Thank you for your feedback!
            </p>
          </Card>
        )}
      </Card>
    </div>
  );
};
