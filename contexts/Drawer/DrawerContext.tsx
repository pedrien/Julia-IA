"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type DrawerContextType = {
    drawers: { [key: string]: boolean };
    openDrawer: (name: string) => void;
    closeDrawer: (name: string) => void;
    isDrawerOpen: (name: string) => boolean;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawerContext = (): DrawerContextType => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error(
            "useDrawerContext doit être utilisé à l’intérieur d’un DrawerProvider"
        );
    }
    return context;
};

type DrawerProviderProps = {
    children: ReactNode;
};

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
    const [drawers, setDrawers] = useState<{ [key: string]: boolean }>({});

    const openDrawer = (name: string) => {
        setDrawers((prev) => ({ ...prev, [name]: true }));
    };

    const closeDrawer = (name: string) => {
        setDrawers((prev) => ({ ...prev, [name]: false }));
    };

    const isDrawerOpen = (name: string): boolean => {
        return !!drawers[name];
    };

    return (
        <DrawerContext.Provider
            value={{ drawers, openDrawer, closeDrawer, isDrawerOpen }}
        >
            {children}
        </DrawerContext.Provider>
    );
};
