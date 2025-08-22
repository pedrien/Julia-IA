"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalContextType = {
    modals: { [key: string]: boolean };
    openModal: (name: string) => void;
    closeModal: (name: string) => void;
    isModalOpen: (name: string) => boolean;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error(
            "useModalContext doit être utilisé à l’intérieur d’un ModalProvider"
        );
    }
    return context;
};

type ModalProviderProps = {
    children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [modals, setModals] = useState<{ [key: string]: boolean }>({});

    const openModal = (name: string) => {
        setModals((prev) => ({ ...prev, [name]: true }));
    };

    const closeModal = (name: string) => {
        setModals((prev) => ({ ...prev, [name]: false }));
    };

    const isModalOpen = (name: string): boolean => {
        return !!modals[name];
    };

    return (
        <ModalContext.Provider
            value={{ modals, openModal, closeModal, isModalOpen }}
        >
            {children}
        </ModalContext.Provider>
    );
};
