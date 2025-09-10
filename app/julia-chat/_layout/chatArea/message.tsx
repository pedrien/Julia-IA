import { Avatar } from "@heroui/react";
import { User } from "lucide-react";

interface MessageProps {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const Message = ({ content, sender, timestamp }: MessageProps) => {
  const isUser = sender === "user";

  return (
    <div
      className={`flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className={`flex-shrink-0 `}>
        {isUser ? (
          <Avatar className="w-8 h-8 bg-primaryColor text-white">
            <User size={16} />
          </Avatar>
        ) : (
          <Avatar className="w-8 h-8" src="/images/julia.jpeg"></Avatar>
        )}
      </div>

      <div
        className={`flex flex-col max-w-[70%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-primaryColor text-white rounded-br-none"
              : "bg-bgCard  text-colorTitle rounded-bl-none"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
        <span className="text-xs text-colorMuted mt-1">
          {timestamp.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default Message;
