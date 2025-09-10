export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastMessage: Date;
}

// Réponses factices de l'IA
const aiResponses = [
  "C'est une excellente question ! Laissez-moi vous expliquer cela en détail...",
  "Je comprends votre préoccupation. Voici ce que je peux vous dire à ce sujet :",
  "Très intéressant ! D'après mon analyse, voici ce que je recommande :",
  "C'est un point important à considérer. Permettez-moi de vous donner quelques conseils :",
  "Excellente observation ! Voici mon point de vue sur cette question :",
  "Je suis ravie que vous me posiez cette question. Voici ma réponse :",
  "C'est un sujet fascinant ! Laissez-moi partager mes connaissances avec vous :",
  "Parfait ! Je vais vous expliquer cela étape par étape :",
  "C'est une question complexe, mais je vais faire de mon mieux pour vous aider :",
  "Merci pour cette question pertinente ! Voici ce que je pense :",
];

// Questions d'exemple
const exampleQuestions = [
  "Comment puis-je optimiser mes performances ?",
  "Quelles sont les meilleures pratiques en développement ?",
  "Peux-tu m'aider avec un problème technique ?",
  "Comment gérer le stress au travail ?",
  "Quelles sont les tendances technologiques actuelles ?",
  "Comment améliorer ma productivité ?",
  "Peux-tu m'expliquer ce concept ?",
  "Quels conseils peux-tu me donner ?",
];

// Générer une réponse factice de l'IA
export const generateAIResponse = (userMessage: string): string => {
  const randomResponse =
    aiResponses[Math.floor(Math.random() * aiResponses.length)];
  const additionalContent = generateAdditionalContent(userMessage);
  return `${randomResponse}\n\n${additionalContent}`;
};

// Générer du contenu additionnel basé sur le message de l'utilisateur
const generateAdditionalContent = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("développement") || lowerMessage.includes("code")) {
    return "En développement, il est crucial de suivre les bonnes pratiques comme l'écriture de code propre, les tests unitaires, et la documentation. Je recommande d'utiliser des outils comme Git pour le versioning et de suivre les principes SOLID pour une architecture robuste.";
  }

  if (
    lowerMessage.includes("productivité") ||
    lowerMessage.includes("efficacité")
  ) {
    return "Pour améliorer votre productivité, je suggère de :\n• Utiliser la technique Pomodoro\n• Organiser vos tâches par priorité\n• Éliminer les distractions\n• Prendre des pauses régulières\n• Utiliser des outils de gestion de projet";
  }

  if (lowerMessage.includes("stress") || lowerMessage.includes("pression")) {
    return "La gestion du stress est essentielle pour maintenir un équilibre de vie sain. Voici quelques stratégies :\n• Pratiquez la méditation ou la respiration profonde\n• Maintenez un horaire de sommeil régulier\n• Faites de l'exercice régulièrement\n• N'hésitez pas à demander de l'aide quand nécessaire";
  }

  if (lowerMessage.includes("technologie") || lowerMessage.includes("tech")) {
    return "Les technologies évoluent rapidement ! Actuellement, les tendances incluent :\n• L'intelligence artificielle et le machine learning\n• Le développement cloud-native\n• Les frameworks JavaScript modernes\n• L'Internet des objets (IoT)\n• La cybersécurité renforcée";
  }

  // Réponse générique
  return "C'est un sujet très intéressant qui mérite une attention particulière. Je suis là pour vous accompagner dans votre réflexion et vous fournir les informations dont vous avez besoin. N'hésitez pas à me poser des questions plus spécifiques si vous souhaitez approfondir certains aspects !";
};

// Générer une question d'exemple aléatoire
export const getRandomExampleQuestion = (): string => {
  return exampleQuestions[Math.floor(Math.random() * exampleQuestions.length)];
};

// Conversations factices
export const fakeConversations: Conversation[] = [
  {
    id: "1",
    title: "Documentation ARAKA Pay Integration Guide",
    lastMessage: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 heures
    messages: [
      {
        id: "1-1",
        content:
          "Bonjour Julia, peux-tu m'aider avec l'intégration d'ARAKA Pay ?",
        sender: "user",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "1-2",
        content:
          "Bonjour ! Bien sûr, je serais ravie de vous aider avec l'intégration d'ARAKA Pay. C'est une excellente plateforme de paiement !\n\nPour commencer, vous devrez :\n• Créer un compte développeur sur ARAKA Pay\n• Obtenir vos clés API\n• Installer le SDK approprié\n• Configurer les webhooks\n\nAvez-vous déjà un compte développeur ?",
        sender: "ai",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000),
      },
    ],
  },
  {
    id: "2",
    title: "Optimisation des performances React",
    lastMessage: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 jour
    messages: [
      {
        id: "2-1",
        content: "Mon application React est lente, que puis-je faire ?",
        sender: "user",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: "2-2",
        content:
          "C'est un problème courant ! Voici mes recommandations pour optimiser votre application React :\n\n**1. Utilisez React.memo()** pour éviter les re-renders inutiles\n**2. Implémentez le code splitting** avec React.lazy()\n**3. Optimisez les images** et utilisez le lazy loading\n**4. Utilisez useMemo() et useCallback()** pour les calculs coûteux\n**5. Analysez avec React DevTools Profiler**\n\nVoulez-vous que je vous aide avec une de ces optimisations spécifiquement ?",
        sender: "ai",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 45000),
      },
    ],
  },
  {
    id: "3",
    title: "Gestion d'état avec Redux",
    lastMessage: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 jours
    messages: [
      {
        id: "3-1",
        content: "Comment bien structurer mon store Redux ?",
        sender: "user",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: "3-2",
        content:
          "Excellente question ! La structure de votre store Redux est cruciale pour la maintenabilité. Voici une approche recommandée :\n\n```javascript\n{\n  entities: {\n    users: {},\n    posts: {},\n    comments: {}\n  },\n  ui: {\n    modals: {},\n    notifications: {}\n  },\n  auth: {\n    user: null,\n    isAuthenticated: false\n  }\n}\n```\n\nCette structure sépare clairement les données métier des données d'interface utilisateur.",
        sender: "ai",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 60000),
      },
    ],
  },
];
