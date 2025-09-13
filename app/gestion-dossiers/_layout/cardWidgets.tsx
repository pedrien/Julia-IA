import { Folder, CircleCheck, Hourglass } from "lucide-react";
import React from "react";

interface CardWidgetsProps {
  totalFolders: number;
  inprocessFolders: number;
  treatedFolders: number;
}
const CardWidgets = ({
  totalFolders,
  inprocessFolders,
  treatedFolders,
}: CardWidgetsProps) => {
  return (
    <div className="grid grid-cols-12 gap-3 lg:gap-4">
      <div className="col-span-12 lg:col-span-4">
        <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="icon text-primaryColor flex items-center justify-center w-[50px] h-[50px] bg-[#782efa45]  rounded-lg ">
              <Folder className="lg:w-7 lg:h-7"></Folder>
            </div>
            <div>
              <p className="text-colorMuted text-sm mb-1">Total</p>
              <h4 className="text-colorTitle font-semibold lg:text-[22px]">
                {totalFolders}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="icon text-[#ee863a] flex items-center justify-center w-[50px] h-[50px] bg-[#ee863a45]  rounded-lg ">
              <Hourglass className="lg:w-7 lg:h-7"></Hourglass>
            </div>
            <div>
              <p className="text-colorMuted text-sm mb-1">En cours</p>
              <h4 className="text-colorTitle font-semibold lg:text-[22px]">
                {inprocessFolders}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="icon  flex items-center justify-center w-[50px] h-[50px] bg-[#27c6832e] text-[#27c683]  rounded-lg ">
              <CircleCheck className="lg:w-7 lg:h-7"></CircleCheck>
            </div>
            <div>
              <p className="text-colorMuted text-sm mb-1">Traités</p>
              <h4 className="text-colorTitle font-semibold lg:text-[22px]">
                {treatedFolders}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWidgets;
