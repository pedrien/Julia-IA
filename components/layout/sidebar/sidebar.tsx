import { Avatar, Skeleton, Switch } from "@heroui/react";
import {
  FileText,
  Folder,
  LayoutDashboard,
  LogOut,
  Moon,
  PanelLeft,
  Settings,
  Sparkles,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import LinkNav from "./LinkNav";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="sidebar shadow-[0_5px_18px_#00000005] flex flex-col h-full fixed top-0 left-0 bg-bgCard md:w-[250px]">
      <div className="header p-3 border-b border-colorBorder">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image
              src={"/images/logos/logoJulia.png"}
              alt="logo de julia"
              className="w-[70px!important] dark:hidden"
              width={0}
              height={0}
              layout="responsive"
            />
            <Image
              src={"/images/logos/logoJuliaWhite.png"}
              alt="logo de julia"
              className="w-[70px!important] hidden dark:block"
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
      <div className="body flex flex-col flex-grow p-3">
        <h2 className="text-colorMuted dark:text-colorTitle uppercase text-xs mb-2">
          Menu
        </h2>
        <ul className="flex flex-col gap-1">
          <li>
            <LinkNav
              href="/"
              icon={<LayoutDashboard size={20} />}
              title="Bureau"
            />
          </li>
          <li>
            <LinkNav
              href="/rooms"
              icon={<FileText size={20} />}
              title="Comptes rendus"
            />
          </li>
          <li>
            <LinkNav
              href="/gestion-dossiers"
              icon={<Folder size={20} />}
              title="Gestion des dossiers"
            />
          </li>
        </ul>
        <ul className="flex flex-col gap-1 mt-auto mb-3">
          <li>
            <div className="flex items-center justify-between gap-2 p-2">
              <div className="flex items-center gap-2">
                <Moon
                  size={20}
                  className="text-sm text-colorTitle dark:text-colorMuted"
                />
                <span className="text-sm text-colorTitle dark:text-colorMuted">
                  Thème sombre
                </span>
              </div>
              <Switch
                size="sm"
                classNames={{
                  thumb: "bg-white dark:bg-primaryColor",
                  wrapper:
                    "bg-bgGray dark:bg-bgGray dark:group-data-[selected=true]:bg-lightPrimaryColor",
                }}
                isSelected={theme === "dark"}
                onValueChange={toggleTheme}
              />
            </div>
          </li>
          <li>
            <LinkNav
              href="/gestion-courriers"
              icon={<Settings size={20} />}
              title="Paramètres"
            />
          </li>
        </ul>
        <div className="block-new-discussion">
          <Link
            href={"/julia-chat"}
            className="flex items-center justify-center gap-2 duration-300 relative overflow-hidden z-10 transition-all    text-white p-3 px-3 rounded-xl text-sm font-medium bg-primaryColor hover:text-white"
          >
            <div className="circle absolute w-[70px] h-[70px]  -z-10 bg-white rounded-full opacity-40 blur-[10px] -left-[30px] -top-[30px]"></div>
            <Sparkles size={20} />
            Discuter avec Julia
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
