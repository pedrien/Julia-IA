import { Button, Textarea } from "@heroui/react";
import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";

interface WhitingBlockProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const WhitingBlock = ({ onSendMessage, isTyping }: WhitingBlockProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() && !isTyping) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-start sticky bottom-5 bg-bgCard p-5 shadow-[0_5px_18px_#00000005] rounded-3xl">
      <Textarea
        placeholder="Demandez à Julia"
        variant="bordered"
        minRows={1}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        isDisabled={isTyping}
        classNames={{
          inputWrapper:
            "bg-transparent border-colorBorder border-0 shadow-none p-0",
          input:
            "text-colorTitle placeholder:text-colorMuted placeholder:opacity-80 text-[16px]",
        }}
      />
      <Button
        className="w-[38px] h-[38px] rounded-full bg-primaryColor min-w-0 p-0 flex-none text-white"
        onPress={handleSendMessage}
        isDisabled={!inputValue.trim() || isTyping}
      >
        <SendHorizonal size={16} />
      </Button>
    </div>
  );
};

export default WhitingBlock;
