import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PanelLeft,
  LayoutDashboard,
  LogOut,
  FileText,
  BotMessageSquare,
  Mail,
  Settings,
  Moon,
} from "lucide-react";
import LinkNav from "./LinkNav";
import { Avatar } from "@heroui/react";

const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col h-full fixed top-0 left-0 bg-bgCard md:w-[250px] border-r border-colorBorder">
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
      <div className="body flex flex-col flex-grow p-3">
        <h2 className="text-colorMuted uppercase text-xs mb-2">Menu</h2>
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
              href="/compte-rendu"
              icon={<FileText size={20} />}
              title="Compte rendu"
            />
          </li>
          <li>
            <LinkNav
              href="/gestion-courriers"
              icon={<Mail size={20} />}
              title="Gestion des courriers"
            />
          </li>
        </ul>
        <ul className="flex flex-col gap-1 mt-auto mb-3">
          <li>
            <LinkNav
              href="/compte-rendu"
              icon={<Moon size={20} />}
              title="Thème sombre"
            />
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
            href={"#"}
            className="flex items-center gap-2 duration-300 relative overflow-hidden z-10 transition-all    text-white p-2 px-3 rounded-xl text-sm font-medium bg-primaryColor hover:text-white"
          >
            <div className="circle absolute w-[70px] h-[70px]  -z-10 bg-white rounded-full opacity-40 blur-[10px] -left-[30px] -top-[30px]"></div>
            <BotMessageSquare size={22} />
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
      <div className="footer p-3 border-t border-colorBorder">
        <div className="block-user-login border border-colorBorder px-1 py-2 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="w-[36px] h-[36px] flex-none"
            />
            <div className="flex flex-col overflow-hidden w-full gap-1">
              <div className="truncate break-all text-sm text-colorTitle font-medium leading-none">
                <h6>Martins kintambala</h6>
              </div>
              <div className="text-xs text-colorMuted">
                <p>martins@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="btn-logout mr-1 text-colorTitle">
            <LogOut size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
