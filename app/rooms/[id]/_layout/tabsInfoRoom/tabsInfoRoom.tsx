import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";

const TabsInfoRoom = () => {
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
              Détail compte rendu
            </h3>
          </div>
          <Button className="bg-primaryColor text-white">Traiter</Button>
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
      </div>
    </div>
  );
};

export default TabsInfoRoom;
