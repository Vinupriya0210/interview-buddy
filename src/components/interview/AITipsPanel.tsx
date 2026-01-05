import { Card } from '@/components/ui/card';
import { Lightbulb, Eye, MessageCircle, Smile } from 'lucide-react';

const tips = [
  {
    icon: Eye,
    text: 'Maintain eye contact with the camera',
  },
  {
    icon: MessageCircle,
    text: 'Speak clearly and at a moderate pace',
  },
  {
    icon: Smile,
    text: 'Stay confident and positive',
  },
];

export const AITipsPanel = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-green-soft/30 flex items-center justify-center">
          <Lightbulb className="w-3 h-3 text-green-dark" />
        </div>
        <h4 className="text-sm font-medium text-foreground">Quick Tips</h4>
      </div>
      <ul className="space-y-2">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <li key={index} className="flex items-start gap-2 text-xs text-green-muted">
              <Icon className="w-3 h-3 mt-0.5 text-green-soft" />
              {tip.text}
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
