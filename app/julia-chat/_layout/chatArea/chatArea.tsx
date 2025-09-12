import { Avatar } from "@heroui/react";
import { useEffect, useRef } from "react";
import Message from "./message";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatAreaProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatArea = ({ messages, isTyping }: ChatAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="w-full h-full pb-10">
      <div className="space-y-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            content={message.content}
            sender={message.sender}
            timestamp={message.timestamp}
          />
        ))}

        {isTyping && (
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 relative rounded-full overflow-hidden">
                <video
                  src="/videos/2.mp4"
                  className="w-full h-full object-cover absolute top-0 left-0"
                  playsInline
                  loop
                  autoPlay
                  muted
                ></video>
              </div>
              {/* <Avatar className="w-8 h-8" src="/images/julia.jpeg"></Avatar> */}
            </div>
            <div className="flex flex-col max-w-[70%]">
              <div className="px-4 py-3 rounded-2xl bg-bgCard rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-colorMuted rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-colorMuted rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-colorMuted rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatArea;
