import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage } from '@/types/interview';
import { Send, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
}

export const ChatPanel = ({ messages, onSendMessage }: ChatPanelProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header - fixed height */}
      <div className="p-3 border-b border-border flex items-center gap-2 shrink-0">
        <MessageCircle className="w-4 h-4 text-green-dark" />
        <h3 className="font-serif font-medium text-sm">Chat</h3>
      </div>

      {/* Messages - scrollable area only */}
      <div 
        className="flex-1 overflow-y-auto min-h-0"
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(152 18% 68%) hsl(152 18% 95%)'
        }}
      >
        <div className="p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-green-muted text-sm py-8">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No messages yet</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex flex-col max-w-[80%] animate-fade-in',
                  msg.sender === 'student' && 'ml-auto items-end',
                  msg.sender === 'hr' && 'mr-auto items-start',
                  msg.sender === 'system' && 'mx-auto items-center'
                )}
              >
                {msg.sender === 'system' ? (
                  <div className="px-3 py-1.5 rounded-full bg-green-soft/30 text-green-dark text-xs">
                    {msg.content}
                  </div>
                ) : (
                  <>
                    <div
                      className={cn(
                        'px-4 py-2 rounded-2xl text-sm',
                        msg.sender === 'student' && 'bg-green-light text-foreground rounded-br-md',
                        msg.sender === 'hr' && 'bg-green-soft/40 text-foreground rounded-bl-md'
                      )}
                    >
                      {msg.content}
                    </div>
                    <span className="text-xs text-green-muted mt-1">
                      {formatTime(msg.timestamp)}
                    </span>
                  </>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input - fixed at bottom */}
      <div className="p-3 border-t border-border shrink-0">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 h-9 text-sm"
          />
          <Button
            size="icon"
            className="h-9 w-9"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
