"use client";

import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  WifiOff,
  AlertTriangle,
  ServerCrash,
  ShieldAlert,
  Clock,
  Home,
  Mail,
  Lock,
  Search,
  Settings,
} from "lucide-react";
import { Button, Card, CardBody, cn } from "@heroui/react";

export type ErrorType =
  | "network"
  | "server"
  | "timeout"
  | "unauthorized"
  | "forbidden"
  | "not-found"
  | "generic"
  | "maintenance";

export interface ErrorAction {
  label: string;
  onClick: () => void;
  variant?:
    | "solid"
    | "ghost"
    | "flat"
    | "shadow"
    | "bordered"
    | "light"
    | "faded";
  icon?: ReactNode;
  loading?: boolean;
}

export interface ErrorStateProps {
  type?: ErrorType;
  title?: string;
  message?: string;
  actions?: ErrorAction[];
  className?: string;
  size?: "sm" | "md" | "lg";
  showDefaultActions?: boolean;
  isRetryLoading?: boolean;
  onRetry?: () => void;
  onGoHome?: () => void;
  onContactSupport?: () => void;
}

// Composants d'icônes animées pour chaque type d'erreur
const AnimatedNetworkIcon = () => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      animate={{
        rotate: [0, -10, 10, -10, 0],
        scale: [1, 1.1, 1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1,
      }}
    >
      <WifiOff className="h-16 w-16 text-blue-500" />
    </motion.div>
    {/* Effet de signal perturbé */}
    <motion.div
      className="absolute -top-2 -right-2"
      animate={{
        opacity: [0, 1, 0],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 0.5,
      }}
    >
      <div className="h-4 w-4 bg-red-500 rounded-full" />
    </motion.div>
  </motion.div>
);

const AnimatedServerIcon = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      animate={{
        y: [0, -5, 0],
        rotateX: [0, 5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <ServerCrash className="h-16 w-16 text-red-500" />
    </motion.div>
    {/* Particules d'erreur */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${20 + i * 15}px`,
          top: `${10 + i * 5}px`,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: i * 0.2,
          ease: "easeOut",
        }}
      >
        <div className="h-2 w-2 bg-red-400 rounded-full" />
      </motion.div>
    ))}
  </motion.div>
);

const AnimatedTimeoutIcon = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, type: "spring" }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <Clock className="h-16 w-16 text-orange-500" />
    </motion.div>
    {/* Effet de sablier */}
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <div className="h-20 w-20 border-2 border-orange-300 rounded-full" />
    </motion.div>
  </motion.div>
);

const AnimatedUnauthorizedIcon = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      animate={{
        x: [0, -3, 3, -3, 0],
        rotate: [0, -2, 2, -2, 0],
      }}
      transition={{
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 2,
      }}
    >
      <Lock className="h-16 w-16 text-yellow-500" />
    </motion.div>
    {/* Effet de verrouillage */}
    <motion.div
      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
      animate={{
        scale: [0, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1,
      }}
    >
      <ShieldAlert className="h-6 w-6 text-yellow-400" />
    </motion.div>
  </motion.div>
);

const AnimatedForbiddenIcon = () => (
  <motion.div
    initial={{ opacity: 0, scale: 1.2 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        filter: ["hue-rotate(0deg)", "hue-rotate(10deg)", "hue-rotate(0deg)"],
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <ShieldAlert className="h-16 w-16 text-red-500" />
    </motion.div>
    {/* Croix d'interdiction */}
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <motion.div
        className="h-1 w-12 bg-red-600 rounded"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.div>
  </motion.div>
);

const AnimatedNotFoundIcon = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      animate={{
        y: [0, -2, 0],
        rotate: [0, 1, -1, 0],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <Search className="h-16 w-16 text-gray-500" />
    </motion.div>
    {/* Points d'interrogation flottants */}
    {[...Array(2)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-gray-400 font-bold text-xl"
        style={{
          right: `${-10 - i * 15}px`,
          top: `${5 + i * 10}px`,
        }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 1, 0.3],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          delay: i * 0.5,
          ease: "easeInOut",
        }}
      >
        ?
      </motion.div>
    ))}
  </motion.div>
);

const AnimatedMaintenanceIcon = () => (
  <motion.div
    initial={{ opacity: 0, rotate: -10 }}
    animate={{ opacity: 1, rotate: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      animate={{
        rotate: [0, 5, -5, 0],
        y: [0, -2, 0],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <Settings className="h-16 w-16 text-blue-500" />
    </motion.div>
    {/* Engrenages en arrière-plan */}
    <motion.div
      className="absolute -top-2 -left-2"
      animate={{ rotate: 360 }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <div className="h-6 w-6 border-2 border-blue-300 rounded-full" />
    </motion.div>
    <motion.div
      className="absolute -bottom-2 -right-2"
      animate={{ rotate: -360 }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <div className="h-4 w-4 border-2 border-blue-400 rounded-full" />
    </motion.div>
  </motion.div>
);

const AnimatedGenericIcon = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
  >
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, -1, 1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <AlertTriangle className="h-16 w-16 text-gray-500" />
    </motion.div>
    {/* Effet de pulsation */}
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.2, 0, 0.2],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeOut",
      }}
    >
      <div className="h-20 w-20 border border-gray-300 rounded-full" />
    </motion.div>
  </motion.div>
);

const errorConfigs = {
  network: {
    icon: <AnimatedNetworkIcon />,
    title: "Problème de connexion",
    message: "Vérifiez votre connexion internet et réessayez.",
    color: "blue",
  },
  server: {
    icon: <AnimatedServerIcon />,
    title: "Erreur serveur",
    message:
      "Nos serveurs rencontrent des difficultés. Veuillez réessayer plus tard.",
    color: "red",
  },
  timeout: {
    icon: <AnimatedTimeoutIcon />,
    title: "Délai d'attente dépassé",
    message: "La requête a pris trop de temps. Veuillez réessayer.",
    color: "orange",
  },
  unauthorized: {
    icon: <AnimatedUnauthorizedIcon />,
    title: "Accès non autorisé",
    message: "Vous devez vous connecter pour accéder à cette ressource.",
    color: "yellow",
  },
  forbidden: {
    icon: <AnimatedForbiddenIcon />,
    title: "Accès interdit",
    message: "Vous n'avez pas les permissions nécessaires pour cette action.",
    color: "red",
  },
  "not-found": {
    icon: <AnimatedNotFoundIcon />,
    title: "Ressource introuvable",
    message: "La ressource demandée n'existe pas ou a été supprimée.",
    color: "gray",
  },
  maintenance: {
    icon: <AnimatedMaintenanceIcon />,
    title: "Maintenance en cours",
    message:
      "Nous effectuons une maintenance. Le service sera bientôt rétabli.",
    color: "blue",
  },
  generic: {
    icon: <AnimatedGenericIcon />,
    title: "Une erreur est survenue",
    message: "Quelque chose s'est mal passé. Veuillez réessayer.",
    color: "gray",
  },
};

export function AnimatedErrorState({
  type = "generic",
  title,
  message,
  actions = [],
  className,
  size = "md",
  showDefaultActions = true,
  onRetry,
  isRetryLoading = false,
  onGoHome,
  onContactSupport,
}: ErrorStateProps) {
  const config = errorConfigs[type];

  const sizeClasses = {
    sm: "p-4 space-y-3",
    md: "p-6 space-y-4",
    lg: "p-8 space-y-6",
  };

  const textSizeClasses = {
    sm: { title: "text-lg", message: "text-sm" },
    md: { title: "text-xl", message: "text-base" },
    lg: { title: "text-2xl", message: "text-lg" },
  };

  // Actions par défaut basées sur le type d'erreur
  const getDefaultActions = (): ErrorAction[] => {
    const defaultActions: ErrorAction[] = [];

    if (onRetry && ["network", "server", "timeout", "generic"].includes(type)) {
      defaultActions.push({
        label: "Réessayer",
        onClick: onRetry,
        loading: isRetryLoading,
        variant: "solid",
        icon: <RefreshCw className="h-4 w-4" />,
      });
    }

    if (onGoHome && ["not-found", "forbidden", "unauthorized"].includes(type)) {
      defaultActions.push({
        label: "Retour à l'accueil",
        onClick: onGoHome,
        variant: "solid",
        icon: <Home className="h-4 w-4" />,
      });
    }

    if (onContactSupport && ["server", "forbidden", "generic"].includes(type)) {
      defaultActions.push({
        label: "Contacter le support",
        onClick: onContactSupport,
        variant: "solid",
        icon: <Mail className="h-4 w-4" />,
      });
    }

    return defaultActions;
  };

  const finalActions = showDefaultActions
    ? [...getDefaultActions(), ...actions]
    : actions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card
        className={cn("w-full max-w-md mx-auto overflow-hidden", className)}
      >
        <CardBody
          className={cn(
            "flex flex-col items-center text-center relative",
            sizeClasses[size]
          )}
        >
          {/* Effet de fond animé */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, currentColor 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, currentColor 0%, transparent 50%)",
                "radial-gradient(circle at 40% 50%, currentColor 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Icône animée */}
          <motion.div
            className="flex-shrink-0 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {config.icon}
          </motion.div>

          {/* Texte avec animation */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.h3
              className={cn(
                "font-semibold text-foreground",
                textSizeClasses[size].title
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {title || config.title}
            </motion.h3>
            <motion.p
              className={cn(
                "text-muted-foreground text-xs",
                textSizeClasses[size].message
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {message || config.message}
            </motion.p>
          </motion.div>

          {/* Actions avec animation */}
          <AnimatePresence>
            {finalActions.length > 0 && (
              <motion.div
                className="flex flex-col sm:grid sm:grid-cols-2 gap-2 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {finalActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onPress={action.onClick}
                      variant={
                        action.label === "Contacter le support"
                          ? "solid"
                          : "bordered"
                      }
                      disabled={action.loading}
                      className={cn(
                        "gap-2 w-full ",
                        action.label === "Contacter le support"
                          ? "bg-black text-white"
                          : "border-1"
                      )}
                      isLoading={
                        action.label !== "Contacter le support"
                          ? isRetryLoading
                          : false
                      }
                    >
                      <motion.div
                        animate={action.loading ? { rotate: 360 } : {}}
                        transition={
                          action.loading
                            ? {
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }
                            : {}
                        }
                      >
                        {action.icon}
                      </motion.div>
                      {action.label}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardBody>
      </Card>
    </motion.div>
  );
}

// Composant spécialisé pour les erreurs de chargement de données
export function AnimatedDataLoadError({
  onRetry,
  retryLoading = false,
  title = "Échec du chargement",
  message = "Nous avons rencontré un problème lors du chargement des données. Veuillez réessayer ou contacter le support si le problème persiste.",
  showContactSupport = true,
  onContactSupport,
  className,
  isRetryLoading,
}: {
  onRetry?: () => void;
  retryLoading?: boolean;
  title?: string;
  message?: string;
  showContactSupport?: boolean;
  onContactSupport?: () => void;
  className?: string;
  isRetryLoading?: boolean;
}) {
  const actions: ErrorAction[] = [];

  if (onRetry) {
    actions.push({
      label: "Réessayer",
      onClick: onRetry,
      variant: "solid",
      icon: <RefreshCw className="h-4 w-4" />,
      loading: retryLoading,
    });
  }

  if (showContactSupport && onContactSupport) {
    actions.push({
      label: "Contacter le support",
      onClick: onContactSupport,
      variant: "solid",
      icon: <Mail className="h-4 w-4" />,
    });
  }

  return (
    <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
      <AnimatedErrorState
        type="generic"
        title={title}
        message={message}
        actions={actions}
        showDefaultActions={false}
        className={className}
        isRetryLoading={isRetryLoading}
      />
    </div>
  );
}
