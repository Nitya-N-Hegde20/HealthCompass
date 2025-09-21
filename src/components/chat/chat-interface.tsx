'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import { getSymptomAnalysis } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';


interface Message {
  role: 'user' | 'ai';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "Hello! I'm your HealthCompass AI assistant. Please describe your symptoms, and I'll suggest which type of specialist you might want to see.\n\nAdmin credentials:\nUsername: admin\nPassword: password",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    const result = await getSymptomAnalysis(userMessage);
    setIsLoading(false);

    if (result.success && result.data) {
      const { suggestedSpecialists, reasoning } = result.data;
      const aiResponse = `Suggested Specialists:\n${suggestedSpecialists}\n\nReasoning:\n${reasoning}`;
      setMessages((prev) => [...prev, { role: 'ai', content: aiResponse }]);
    } else {
      setMessages((prev) => [...prev, { role: 'ai', content: "I'm sorry, I encountered an error. Please try again." }]);
    }
  };

  return (
    <Card className="w-full max-w-3xl h-[calc(100vh-8rem)] flex flex-col shadow-2xl m-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot /> AI Symptom Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'ai' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><Bot size={20} /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[75%] rounded-lg p-3 text-sm whitespace-pre-wrap',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.content}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><User size={20}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="w-8 h-8">
                    <AvatarFallback><Bot size={20} /></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., I have chest pain and shortness of breath..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
