import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-secondary/30 p-4">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Phone />
            AI Health Assistant
          </CardTitle>
          <CardDescription>
            Your conversational guide to better health is ready.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The AI agent should appear momentarily at the bottom right of your screen. Use the pop-up window to start your conversation. You can ask about symptoms, find doctors, or get health information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
