import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";
import { Avatar, Chip } from "@heroui/react";
import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";

const TabsInfoRoom = () => {
  const { openDrawer } = useDrawerContext();
  return (
    <div className="flex flex-col h-screen">
      <div className="header p-3 border-b border-colorBorder">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Link
              href={"/rooms"}
              className="w-[36px] h-[36px] flex justify-center items-center text-colorTitle"
            >
              <ArrowLeft size={20} />
            </Link>
            <h3 className="text-colorTitle font-semibold text-[18px]">
              Compte rendu
            </h3>
          </div>
          <Button className="bg-primaryColor text-white text-xs h-auto py-2">Marquer comme Traiter</Button>
        </div>
      </div>
      <div className="body p-3 px-6 flex-grow overflow-y-auto">
        <h3 className="text-colorTitle font-semibold mb-3">Infos générales</h3>
        <div className="card p-3 rounded-xl border border-colorBorder border-dashed">
          <div className="flex flex-col gap-3">
            <div>
              <h4 className="text-colorTitle font-medium text-sm mb-1">
                Titre
              </h4>
              <p className="text-colorMuted text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>
            </div>
            <div>
              <h4 className="text-colorTitle font-medium text-sm mb-1">Date</h4>
              <p className="text-colorMuted text-sm">29/08/2025</p>
            </div>
            <div>
              <h4 className="text-colorTitle font-medium text-sm mb-1">
                Description
              </h4>
              <p className="text-colorMuted text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
                vel officia maiores!
              </p>
            </div>
          </div>
        </div>
        <h3 className="text-colorTitle font-semibold mb-3 mt-4">
          Participants
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center cursor-pointer" onClick={() => openDrawer("AvisParticipants")}>
            <Avatar
              alt={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
              className="shrink-0"
              size="md"
              src={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-small text-colorTitle">
                  Tony Reichert
                </span>
                <div className="flex items-center gap-1">
                  <Chip
                    className="bg-[#f08d501b]  text-[#f08c50] text-[10px]"
                    size="sm"
                  >
                    Non lu
                  </Chip>
                  <Chip
                    className="bg-[#e829291b]  text-[#e82929] text-[10px]"
                    size="sm"
                  >
                    Non traité
                  </Chip>
                </div>
              </div>
              <span className="text-tiny text-colorMuted">
                tony.reichert@example.com
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center cursor-pointer" onClick={() => openDrawer("AvisParticipants")}>
            <Avatar
              alt={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
              className="shrink-0"
              size="md"
              src={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-small text-colorTitle">
                  Tony Reichert
                </span>
                <div className="flex items-center gap-1">
                  <Chip
                    className="bg-[#5078f01b]  text-[#5078f0] text-[10px]"
                    size="sm"
                  >
                    Lu
                  </Chip>
                  <Chip
                    className="bg-[#2ac66618] text-[#2ac667] text-[10px]"
                    size="sm"
                  >
                    Traité
                  </Chip>
                </div>
              </div>
              <span className="text-tiny text-colorMuted">
                tony.reichert@example.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsInfoRoom;
