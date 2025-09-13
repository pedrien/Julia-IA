import { FileText, Folder, UsersRound } from "lucide-react";
import React from "react";

const BlockCardWidget = () => {
  return (
    <div className="mt-3 lg:mt-4    ">
      <div className="grid grid-cols-12 gap-3 lg:gap-4">
        <div className="col-span-12 lg:col-span-4">
          <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="icon text-primaryColor flex items-center justify-center w-[50px] h-[50px] bg-[#782efa45]  rounded-lg ">
                <UsersRound className="lg:w-7 lg:h-7"></UsersRound>
              </div>
              <div>
                <p className="text-colorMuted text-sm mb-1 lg:text-[16px]">Réunions</p>
                <h4 className="text-colorTitle font-semibold lg:text-[22px]">
                  40
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="icon bg-[#27c6832e] text-[#27c683] flex flex-none items-center justify-center w-[50px] h-[50px] rounded-lg ">
                <FileText className="lg:w-7 lg:h-7"></FileText>
              </div>
              <div className="w-full">
                <p className="text-colorMuted text-sm mb-1 lg:text-[16px]">Compte rendus</p>
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-colorTitle font-semibold lg:text-[22px]">
                    30
                  </h4>
                  <div className="flex items-center gap-1">
                    <h5 className="text-colorTitle font-semibold lg:text-[20px]">
                      20
                    </h5>
                    <span className="text-colorMuted text-sm">Traités</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="icon bg-[#494cff47] text-[#494cff] flex flex-none items-center justify-center w-[50px] h-[50px] rounded-lg ">
                <Folder className="lg:w-7 lg:h-7"></Folder>
              </div>
              <div className="w-full">
                <p className="text-colorMuted text-sm lg:text-[16px] mb-1">Dossiers</p>
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-colorTitle font-semibold lg:text-[22px]">
                    10
                  </h4>
                  <div className="flex items-center gap-1">
                    <h5 className="text-colorTitle font-semibold lg:text-[20px]">
                      6
                    </h5>
                    <span className="text-colorMuted text-sm">Traités</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockCardWidget;
