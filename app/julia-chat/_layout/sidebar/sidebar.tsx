import Link from "next/link";
import Image from "next/image";
import { PanelLeft, LogOut, MessageCirclePlus } from "lucide-react";
import { Avatar, Skeleton, Input } from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import ItemDiscussion from "./itemDiscussion";

const Sidebar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="w-[250px] h-full fixed bg-bgCard flex flex-col top-0 left-0 z-50">
      <div className="header p-3 border-b border-colorBorder">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image
              src={"/images/logos/logoJulia.png"}
              alt="logo de julia"
              className="w-[70px!important]"
              width={0}
              height={0}
              layout="responsive"
            />
          </Link>
          <div className="btn-resize-sidebar duration-300 text-colorTitle hover:text-primaryColor flex items-center justify-center cursor-pointer w-9 h-9 rounded-lg hover:bg-lightPrimaryColor">
            <PanelLeft size={20} />
          </div>
        </div>
      </div>
      <div className="block-new-discussion p-3">
        <Link
          href={"#"}
          className="flex items-center justify-center gap-2 duration-300 relative overflow-hidden z-10 transition-all    text-white p-3 px-3 rounded-xl text-sm font-medium bg-primaryColor hover:text-white"
        >
          <div className="circle absolute w-[70px] h-[70px]  -z-10 bg-white rounded-full opacity-40 blur-[10px] -left-[30px] -top-[30px]"></div>
          <MessageCirclePlus size={20} />
          Nouvelle discussion
          <div className="circle absolute w-[70px] h-[70px]  -z-10 bg-white rounded-full opacity-40 blur-[10px] -right-[30px] -bottom-[30px]"></div>
          <div className="w-full h-full absolute top-0 left-0 -z-10 opacity-40">
            <Image
              src={"/images/img.png"}
              layout="responsive"
              alt="image"
              width={0}
              height={0}
              className="w-full h-[100%!important] object-cover  relative"
            />
          </div>
        </Link>
      </div>
      <div className="body flex flex-col flex-grow p-3">
        <h2 className="text-colorMuted uppercase text-xs mb-2">
            Discussions
        </h2>
        <div className="flex flex-col">
            <ItemDiscussion title="Documentation ARAKA Pay Integration Guide" />
            <ItemDiscussion title="Discussion 2" />
            <ItemDiscussion title="Discussion 3" />
        </div>
      </div>
      {status === "authenticated" ? (
        <div className="footer p-3">
          <div className="block-user-login border border-colorBorder px-1 py-2 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {session?.user?.avatar ? (
                <Avatar
                  src={session?.user?.avatar}
                  className="w-[36px] h-[36px] flex-none"
                />
              ) : (
                <Avatar className="w-[36px] h-[36px] flex-none" />
              )}
              <div className="flex flex-col overflow-hidden w-full gap-1">
                <div className="truncate break-all text-sm text-colorTitle font-medium leading-none">
                  <h6>{session?.user?.name}</h6>
                </div>
                <div className="text-xs text-colorMuted">
                  <p>{session?.user?.email}</p>
                </div>
              </div>
            </div>
            <div
              className="btn-logout mr-1 text-colorTitle cursor-pointer"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.href}`,
                })
              }
            >
              <LogOut size={18} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Skeleton className="w-full h-[50px] rounded-xl" />
        </>
      )}
    </div>
  );
};

export default Sidebar;
