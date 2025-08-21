"use client";
import React, { JSX,} from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";

function AppContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="global-div min-h-screen flex flex-col">
      <Sidebar></Sidebar>
      <div className="wrapper flex-grow bg-bgFond lg:pl-[250px] lg:py-5">{children}</div>
    </div>
  );
}

export default AppContainer;
