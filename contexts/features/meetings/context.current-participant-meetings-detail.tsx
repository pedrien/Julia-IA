"use client";

import { MeetingParticipant } from "@/validators/meetings/validator.detail-meetings";
import { createContext, useContext, useState, ReactNode } from "react";

interface CurrentParticipantContextType {
  currentParticipant: MeetingParticipant | null;
  setCurrentParticipant: (participant: MeetingParticipant | null) => void;
  clearCurrentParticipant: () => void;
}

const CurrentParticipantContext = createContext<
  CurrentParticipantContextType | undefined
>(undefined);

interface CurrentParticipantProviderProps {
  children: ReactNode;
}

export function CurrentParticipantProvider({
  children,
}: CurrentParticipantProviderProps) {
  const [currentParticipant, setCurrentParticipant] =
    useState<MeetingParticipant | null>(null);

  const clearCurrentParticipant = () => {
    setCurrentParticipant(null);
  };

  const value: CurrentParticipantContextType = {
    currentParticipant,
    setCurrentParticipant,
    clearCurrentParticipant,
  };

  return (
    <CurrentParticipantContext.Provider value={value}>
      {children}
    </CurrentParticipantContext.Provider>
  );
}

export function useCurrentParticipant() {
  const context = useContext(CurrentParticipantContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentParticipant must be used within a CurrentParticipantProvider"
    );
  }
  return context;
}
