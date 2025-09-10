"use client";
import ViewApp from "@/components/common/containers/ViewApp";
import { useState } from "react";
import ChatArea from "./chatArea/chatArea";
import { Message, generateAIResponse } from "./data/fakeData";
import Sidebar from "./sidebar/sidebar";
import WhitingBlock from "./whitingBlock/whitingBlock";

interface Discussion {
  id: string;
  title: string;
  lastMessage: Date;
  messageCount: number;
}

const Content = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [currentDiscussionId, setCurrentDiscussionId] = useState<string | null>(
    null
  );

  const handleNewDiscussion = () => {
    setMessages([]);
    setIsTyping(false);
    setCurrentDiscussionId(null);
  };

  const handleSelectDiscussion = (discussionId: string) => {
    setCurrentDiscussionId(discussionId);
    // Ici on pourrait charger les messages de la discussion sélectionnée
    // Pour l'instant, on simule en vidant les messages
    setMessages([]);
    setIsTyping(false);
  };

  const handleSendMessage = async (content: string) => {
    // Créer une nouvelle discussion si c'est le premier message
    if (messages.length === 0 && !currentDiscussionId) {
      const newDiscussionId = Date.now().toString();
      const newDiscussion: Discussion = {
        id: newDiscussionId,
        title: content.length > 30 ? content.substring(0, 30) + "..." : content,
        lastMessage: new Date(),
        messageCount: 0,
      };
      setDiscussions((prev) => [newDiscussion, ...prev]);
      setCurrentDiscussionId(newDiscussionId);
    }

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simuler une réponse de l'IA après un délai
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);

      // Mettre à jour la discussion avec le nouveau message
      if (currentDiscussionId) {
        setDiscussions((prev) =>
          prev.map((disc) =>
            disc.id === currentDiscussionId
              ? {
                  ...disc,
                  lastMessage: new Date(),
                  messageCount: disc.messageCount + 2, // +2 pour user + ai
                }
              : disc
          )
        );
      }
    }, 1500 + Math.random() * 2000); // Délai aléatoire entre 1.5 et 3.5 secondes
  };

  return (
    <>
      <Sidebar
        onNewDiscussion={handleNewDiscussion}
        discussions={discussions}
        currentDiscussionId={currentDiscussionId}
        onSelectDiscussion={handleSelectDiscussion}
      />
      <div className="flex flex-col h-screen bg-[#f5f7fb] lg:pl-[250px]">
        <div className="body flex-grow overflow-y-auto">
          <div className="max-w-[840px] w-full h-full flex flex-col mx-auto px-2 lg:px-0 lg:py-10 py-5">
            <div className="flex-grow lg:px-3">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <div className="w-full text-center">
                    <h2 className="lg:text-[34px] font-semibold text-colorTitle">
                      Salut 👋
                    </h2>
                    <p className="text-colorMuted text-sm mt-2">
                      Posez-moi n&apos;importe quelle question, je suis là pour
                      vous aider !
                    </p>
                    <div className="mt-8">
                      <h3 className="text-sm font-medium text-colorTitle mb-4">
                        Questions d&apos;exemple :
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          "Comment optimiser mes performances ?",
                          "Quelles sont les meilleures pratiques en développement ?",
                          "Peux-tu m'aider avec un problème technique ?",
                          "Comment gérer le stress au travail ?",
                          "Quelles sont les tendances technologiques actuelles ?",
                          "Comment améliorer ma productivité ?",
                        ].map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleSendMessage(question)}
                            className="px-3 py-2 text-xs text-colorTitle bg-bgCard rounded-lg hover:text-white hover:bg-primaryColor hover:border-primaryColor transition-all duration-300 cursor-pointer"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ChatArea messages={messages} isTyping={isTyping} />
              )}
            </div>
            <WhitingBlock
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
            />
          </div>
        </div>
      </div>
    </>
  );
};
const Container = () => {
  return (
    <ViewApp>
      <Content />
    </ViewApp>
  );
};

export default Container;
