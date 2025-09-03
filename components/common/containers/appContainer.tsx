"use client";

import React, { JSX } from "react";
import ClientOnly from "./ClientOnly";
import ToastMain from "./ToastMain";
import { LoadingProvider } from "@/contexts/Overlay/LoadingContext";
import { DrawerProvider } from "@/contexts/Drawer/DrawerContext";
import { ModalProvider } from "@/contexts/Modal/ModalContext";
import OverlayWaiting from "../overlay/OverlayWainting/OverlayWaiting";
import { SidebarProvider } from "@/contexts/SidebarApp/SidebarContext";
import { FullscreenProvider } from "@/contexts/FullscreenContext/context.fullscreen.context";
import Sidebar from "@/components/layout/sidebar/sidebar";
import FloatingBot from "@/components/layout/floatingBot/floatingBot";

function AppContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ClientOnly>
      <>
        <LoadingProvider>
          <DrawerProvider>
            <ModalProvider>
              <FullscreenProvider>
                <SidebarProvider>
                  <div className="global-div min-h-screen flex flex-col">
                    <Sidebar></Sidebar>
                    <div className="wrapper flex-grow bg-bgFond lg:pl-[250px] bg-[#f7f7f7] lg:py-5">
                      {children}
                    </div>
                  </div>
                  <FloatingBot />
                  <ToastMain />
                  <OverlayWaiting />
                </SidebarProvider>
              </FullscreenProvider>
            </ModalProvider>
          </DrawerProvider>
        </LoadingProvider>
      </>
    </ClientOnly>
  );
}

export default AppContainer;
