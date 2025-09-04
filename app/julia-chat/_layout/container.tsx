"use client";
import ViewApp from "@/components/common/containers/ViewApp";
import Sidebar from "./sidebar/sidebar";
import WhitingBlock from "./whitingBlock/whitingBlock";
import { useSession } from "next-auth/react";
const Content = () => {
  const { data: session } = useSession();
  return (
    <>
      <Sidebar />
      <div className="flex flex-col h-screen bg-[#f7f7f7] lg:pl-[250px]">
        <div className="header">
          <h1>Chat</h1>
        </div>
        <div className="body flex-grow overflow-y-auto">
          <div className="max-w-[840px] w-full h-full flex flex-col mx-auto px-2 lg:px-6 lg:py-10 py-5">
            <div className="flex-grow">
              <div className="flex h-full items-center justify-center">
                <div className="w-full text-center">
                  <h2 className="lg:text-[34px] font-semibold">
                    Salut {session?.user?.name} 👋
                  </h2>
                  
                </div>
              </div>
            </div>
            <WhitingBlock />
          </div>
        </div>
      </div>
    </>
  );
};
const Container = () => {
  return <ViewApp>
    <Content/>
  </ViewApp>;
};

export default Container;
