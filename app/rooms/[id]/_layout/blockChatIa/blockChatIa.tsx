import { Button, Textarea } from "@heroui/react";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const BlockChatIa = ({ id }: { id: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Réponses prédéfinies de Julia - Plus humaines et variées
  const juliaResponses: { [key: string]: string[] } = {
    salut: [
      "Salut ! 😊 Comment puis-je vous aider aujourd'hui ?",
      "Hey ! Ravi de vous revoir ! Que puis-je faire pour vous ?",
      "Salut ! J'espère que vous passez une belle journée. Comment puis-je vous assister ?",
      "Bonjour ! Toujours là pour vous aider. Que souhaitez-vous faire ?",
    ],
    bonjour: [
      "Bonjour ! Une belle journée qui commence ! Comment puis-je vous aider ?",
      "Bonjour ! J'espère que vous avez bien dormi. Que puis-je faire pour vous ?",
      "Salut ! Prêt(e) pour une nouvelle journée ? Je suis là pour vous !",
      "Bonjour ! Toujours disponible pour vous accompagner. Que souhaitez-vous ?",
    ],
    "comment tu vas": [
      "Je vais très bien, merci ! Et vous, comment allez-vous ? J'espère que tout va bien de votre côté ! 😊",
      "Ça va super ! Toujours motivée pour vous aider. Et vous, comment vous sentez-vous aujourd'hui ?",
      "Très bien, merci ! J'ai hâte de vous aider. Comment se passe votre journée ?",
      "Parfaitement ! Toujours prête à vous assister. Et vous, tout va bien ?",
    ],
    "ça va": [
      "Ça va très bien, merci ! Toujours là pour vous. Comment puis-je vous être utile aujourd'hui ?",
      "Super bien ! J'adore pouvoir vous aider. Que souhaitez-vous faire ?",
      "Ça va parfaitement ! Toujours disponible pour vous. Comment puis-je vous assister ?",
      "Très bien, merci ! Prête à vous accompagner. Que puis-je faire pour vous ?",
    ],
    aide: [
      "Bien sûr ! Je peux vous aider avec plein de choses :\n• Des questions sur nos services\n• Des informations sur votre compte\n• Des conseils personnalisés\n• Des astuces et bonnes pratiques\nQue souhaitez-vous savoir ? 😊",
      "Avec plaisir ! Je suis là pour vous accompagner dans :\n• La découverte de nos services\n• La gestion de votre compte\n• Des conseils sur mesure\n• Des solutions adaptées\nPar quoi voulez-vous commencer ?",
      "Évidemment ! Je peux vous guider pour :\n• Comprendre nos fonctionnalités\n• Optimiser votre expérience\n• Résoudre vos questions\n• Vous donner des conseils\nQue vous intéresse le plus ?",
    ],
    merci: [
      "De rien ! C'est un plaisir de vous aider. N'hésitez pas si vous avez d'autres questions ! 😊",
      "Avec plaisir ! Je suis toujours là si vous avez besoin d'autre chose.",
      "Pas de souci ! Ravi(e) d'avoir pu vous aider. N'hésitez pas à revenir !",
      "C'est normal ! Je suis là pour ça. N'hésitez pas si vous avez d'autres questions !",
    ],
    "au revoir": [
      "Au revoir ! Passez une excellente journée ! N'hésitez pas à revenir si vous avez besoin d'aide. 👋",
      "Bye ! À bientôt ! Je serai toujours là pour vous quand vous reviendrez.",
      "Au revoir ! Prenez soin de vous ! N'hésitez pas si vous avez besoin d'aide plus tard.",
      "À bientôt ! Passez une belle journée ! Je serai là pour vous accueillir quand vous reviendrez. 👋",
    ],
    bye: [
      "Bye ! À très vite ! N'hésitez pas à revenir si vous avez besoin d'aide. 👋",
      "Au revoir ! Passez une excellente journée ! Je serai là pour vous.",
      "Bye ! Prenez soin de vous ! N'hésitez pas si vous avez des questions plus tard.",
      "À bientôt ! Passez une belle journée ! Je serai toujours là pour vous aider. 👋",
    ],
    bien: [
      "Super ! Je suis contente que ça aille bien. Comment puis-je vous aider aujourd'hui ? 😊",
      "Parfait ! Une belle journée qui s'annonce. Que puis-je faire pour vous ?",
      "Excellent ! Ça fait plaisir à entendre. Comment puis-je vous assister ?",
      "Génial ! Je suis ravie pour vous. Que souhaitez-vous faire ?",
    ],
    mal: [
      "Oh non, je suis désolée d'entendre ça. Est-ce que je peux faire quelque chose pour vous aider ? 😔",
      "Je suis navrée que ça n'aille pas bien. Comment puis-je vous soutenir ?",
      "Courage ! Je suis là pour vous aider. Que puis-je faire pour vous ?",
      "Je comprends, c'est pas toujours facile. Comment puis-je vous assister ?",
    ],
    fatigué: [
      "Je comprends, la fatigue peut être difficile. Prenez du temps pour vous reposer. Comment puis-je vous aider ? 😴",
      "La fatigue, c'est normal parfois. N'hésitez pas à faire des pauses. Que puis-je faire pour vous ?",
      "Je vois que vous êtes fatigué(e). Prenez soin de vous ! Comment puis-je vous assister ?",
      "Courage ! La fatigue passe. En attendant, comment puis-je vous aider ?",
    ],
    stressé: [
      "Le stress peut être difficile à gérer. Respirez profondément, ça va aller. Comment puis-je vous aider ? 😌",
      "Je comprends le stress. N'hésitez pas à prendre des pauses. Que puis-je faire pour vous ?",
      "Le stress, c'est normal dans la vie. Prenez du temps pour vous. Comment puis-je vous assister ?",
      "Courage ! Le stress finit toujours par passer. Comment puis-je vous aider ?",
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getJuliaResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Recherche de mots-clés dans le message
    for (const [keyword, responses] of Object.entries(juliaResponses)) {
      if (lowerMessage.includes(keyword)) {
        // Sélectionner une réponse aléatoire du tableau
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
      }
    }

    // Réponses par défaut variées si aucun mot-clé n'est trouvé
    const defaultResponses = [
      "Je ne suis pas sûre de comprendre. Pouvez-vous reformuler votre question ? 🤔",
      "Hmm, je n'ai pas bien saisi. Pourriez-vous être plus spécifique ?",
      "Je ne comprends pas bien. Pouvez-vous me poser votre question différemment ?",
      "Désolée, je n'ai pas compris. Pourriez-vous reformuler ?",
      "Je ne suis pas certaine de ce que vous voulez dire. Pouvez-vous préciser ?",
    ];

    const randomDefaultIndex = Math.floor(
      Math.random() * defaultResponses.length
    );
    return defaultResponses[randomDefaultIndex];
  };

  const simulateTyping = (response: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Délai aléatoire entre 1-2 secondes
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Marquer le début de la conversation
    if (!hasStartedConversation) {
      setHasStartedConversation(true);
    }

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simuler la réponse de Julia
    const response = getJuliaResponse(inputValue);
    simulateTyping(response);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
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
        {!hasStartedConversation ? (
          // Message de bienvenue initial
          <div className="flex flex-col h-full justify-center items-center">
            <div className="w-full text-center">
              <h2 className="lg:text-[24px] font-semibold">Salut Martins 👋</h2>
              <p className="text-colorMuted text-sm">
                Je suis Julia, toujours prête à vous assister.
              </p>
            </div>
          </div>
        ) : (
          // Interface de chat
          <div className="flex flex-col space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-primaryColor text-white rounded-br-none"
                      : "bg-bgGray text-colorTitle rounded-bl-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">
                    {message.text}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      message.isUser ? "text-white/70" : "text-colorMuted"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
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
        <div ref={messagesEndRef} />
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
              isDisabled={!inputValue.trim() || isTyping}
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
