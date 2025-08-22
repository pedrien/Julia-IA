"use client";

import React, { createContext, useContext, useState } from "react";

type DisplayFormat = "list" | "card";

interface DisplayContextType {
  displayFormat: DisplayFormat;
  toggleDisplayFormat: () => void;
}

const DisplayContext = createContext<DisplayContextType | undefined>(undefined);

export const useDisplayContext = () => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error("useDisplayContext must be used within a DisplayProvider");
  }
  return context;
};

export const DisplayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [displayFormat, setDisplayFormat] = useState<DisplayFormat>("card");

  const toggleDisplayFormat = () => {
    setDisplayFormat((prevFormat) => (prevFormat === "list" ? "card" : "list"));
  };

  return (
    <DisplayContext.Provider value={{ displayFormat, toggleDisplayFormat }}>
      {children}
    </DisplayContext.Provider>
  );
};
