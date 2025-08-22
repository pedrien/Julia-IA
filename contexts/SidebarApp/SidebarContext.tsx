"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    const savedState = sessionStorage.getItem("sideBarApp");
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    sessionStorage.setItem("sideBarApp", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <SidebarContext.Provider
      value={{ isOpen, toggleSidebar, openSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
