import { useGetMeetingChat } from "@/hooks/features/meetings/hook.get-meeting-chat";
import { useAskAiMeeting } from "@/hooks/features/meetings/hook.ask-ai-meeting";
import { Button, Spinner, Textarea } from "@heroui/react";
import { RefreshCcw, SendHorizonal } from "lucide-react";
import Image from "next/image";
import React, { useState, useTransition } from "react";

const BlockChatIa = ({ id }: { id: string }) => {
  const {
    data: chatMessages,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useGetMeetingChat(id);

  const [isAskingAi, startAskingAi] = useTransition();

  const { mutate: askQuestionAi, isPending } = useAskAiMeeting({
    onSuccessCallback: (data) => {
      console.log("Question envoyée avec succès:", data);
      // Rafraîchir les messages après une nouvelle question
      refetch();
    },
    onErrorCallback: (error) => {
      console.error("Erreur lors de l'envoi:", error);
    },
  });

  console.log(chatMessages);
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim() || isPending) return;

    // Marquer le début de la conversation
    if (!hasStartedConversation) {
      setHasStartedConversation(true);
    }

    // Envoyer la question à l'IA via l'API
    startAskingAi(() => {
      askQuestionAi({
        meetingId: id,
        message: inputValue.trim(),
        id_last_message:
          chatMessages?.data[chatMessages?.data.length - 1].id || null,
      });
    });

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-bgCard">
      <div className="header p-3 border-b border-colorBorder">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="content-img rounded-full overflow-hidden w-[44px] h-[44px]">
              <Image
                src={"/images/julia.jpeg"}
                alt="julia"
                width={0}
                height={0}
                className="w-full h-[100%!important] object-cover"
                layout="responsive"
              />
            </div>
            <Image
              src={"/images/logos/logoJulia.png"}
              alt="logo de julia"
              className="w-[44px!important] dark:hidden"
              width={0}
              height={0}
              layout="responsive"
            />
            <Image
              src={"/images/logos/logoJuliaWhite.png"}
              alt="logo de julia"
              className="w-[44px!important] hidden dark:block"
              width={0}
              height={0}
              layout="responsive"
            />
          </div>
        </div>
      </div>

      <div className="body p-3 flex-grow overflow-y-auto px-4">
        {isLoading === true ? (
          <div className="flex items-center justify-center h-full">
            <Spinner
              classNames={{
                circle1: "border-b-primaryColor",
                circle2: "border-b-primaryColor",
              }}
              title="Chargement des messages"
              label="Nous chargeons les messages"
            />
          </div>
        ) : isError === true || !chatMessages ? (
          <div className="flex items-center flex-col justify-center h-full gap-3">
            <span className="text-colorTitle text-sm text-center">
              Une erreur est survenue lors de la récupération des messages
            </span>
            <Button
              className="border-1"
              onPress={() => refetch()}
              isLoading={isRefetching}
              isIconOnly
              variant="bordered"
            >
              <RefreshCcw size={14} />
            </Button>
          </div>
        ) : chatMessages?.data.length === 0 ? (
          <div className="flex flex-col h-full justify-center items-center">
            <div className="w-full text-center">
              <h2 className="lg:text-[24px] font-semibold">Salut Martins 👋</h2>
              <p className="text-colorMuted text-sm">
                Je suis Julia, toujours prête à vous assister.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            {chatMessages?.data.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "USER" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "USER"
                      ? "bg-primaryColor text-white rounded-br-none"
                      : "bg-bgGray text-colorTitle rounded-bl-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">
                    {message.message}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      message.type === "USER"
                        ? "text-white/70"
                        : "text-colorMuted"
                    }`}
                  >
                    {new Date(message.date_time).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isPending && (
              <div className="flex justify-start">
                <div className="bg-bgGray text-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-colorTitle rounded-full animate-bounce"></div>
                      <div
                        className="w-1 h-1 bg-colorTitle rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-colorTitle rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="footer p-[18px] py-3">
        <Textarea
          placeholder="Demandez à Julia"
          variant="bordered"
          minRows={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          classNames={{
            inputWrapper: "bg-bgGray border-colorBorder border-0 shadow-none ",
            input:
              "text-colorTitle placeholder:text-colorMuted placeholder:opacity-70",
          }}
          endContent={
            <Button
              className="w-[32px] h-[32px] bg-primaryColor min-w-0 p-0 flex-none text-white"
              onPress={handleSendMessage}
              isDisabled={isLoading || !inputValue.trim() || isPending}
              isLoading={isLoading || isAskingAi}
              isIconOnly
            >
              <SendHorizonal size={16} />
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default BlockChatIa;
