# Système de Chat avec IA - Julia

Ce système de chat simule une conversation avec une IA en utilisant des données factices.

## Structure des composants

### Container principal (`container.tsx`)

- Gère l'état global du chat (messages, état de frappe)
- Coordonne les interactions entre les composants
- Simule les réponses de l'IA avec des délais aléatoires

### Zone de chat (`chatArea/`)

- **`chatArea.tsx`** : Composant principal qui affiche la conversation
- **`message.tsx`** : Composant pour afficher un message individuel
- **`exampleQuestions.tsx`** : Questions d'exemple pour guider l'utilisateur

### Zone de saisie (`whitingBlock/`)

- **`whitingBlock.tsx`** : Interface de saisie des messages
- Gère l'envoi via bouton ou touche Entrée
- Désactive l'interface pendant la frappe de l'IA

### Données factices (`data/`)

- **`fakeData.ts`** : Contient les réponses simulées de l'IA
- Génère des réponses contextuelles basées sur les mots-clés
- Inclut des conversations d'exemple

## Fonctionnalités

### ✨ Interface utilisateur

- Design moderne avec Tailwind CSS
- Messages différenciés (utilisateur vs IA)
- Indicateur de frappe animé
- Questions d'exemple cliquables
- Scroll automatique vers les nouveaux messages

### 🤖 Simulation IA

- Réponses contextuelles basées sur les mots-clés
- Délais de réponse réalistes (1.5-3.5 secondes)
- Réponses variées et pertinentes
- Support des sauts de ligne et formatage

### 📱 Responsive

- Interface adaptée mobile et desktop
- Sidebar fixe sur desktop
- Optimisé pour différentes tailles d'écran

## Utilisation

```tsx
import Container from "./container";

// Le composant est prêt à l'emploi
<Container />;
```

## Personnalisation

### Ajouter de nouvelles réponses IA

Modifiez le fichier `data/fakeData.ts` :

```typescript
const aiResponses = [
  "Votre nouvelle réponse ici...",
  // ... autres réponses
];
```

### Modifier les questions d'exemple

Dans `chatArea/exampleQuestions.tsx` :

```typescript
const exampleQuestions = [
  "Votre question d'exemple",
  // ... autres questions
];
```

### Styling personnalisé

Les classes Tailwind peuvent être modifiées dans chaque composant selon vos besoins de design.



