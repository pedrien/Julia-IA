import React from "react";
import { Clock, CheckCircle, Hourglass, FileText } from "lucide-react";

const CardWidgets = () => {
  return (
    <div className="grid grid-cols-12 gap-3 lg:gap-4">
      <div className="col-span-12 lg:col-span-6 2xl:col-span-4">
        <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 justify-between mb-3">
            <p className="text-colorMuted">Total</p>
            <div className="icon text-white flex items-center justify-center w-[40px] h-[40px] bg-[#782efa]  rounded-full ">
              <FileText size={20}></FileText>
            </div>
          </div>
          <h4 className="text-colorTitle font-semibold lg:text-[22px]">20</h4>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 2xl:col-span-4">
        <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 justify-between mb-3">
            <p className="text-colorMuted">Lus</p>
            <div className="icon text-[#ffffff] bg-[#5078f0]  flex items-center justify-center w-[40px] h-[40px] rounded-full">
              <Clock size={20}></Clock>
            </div>
          </div>
          <h4 className="text-colorTitle font-semibold lg:text-[22px]">4</h4>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 2xl:col-span-4">
        <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 justify-between mb-3">
            <p className="text-colorMuted">Traités</p>
            <div className="icon text-[#ffffff] bg-[#2ac693]  flex items-center justify-center w-[40px] h-[40px] rounded-full">
              <CheckCircle size={20}></CheckCircle>
            </div>
          </div>
          <h4 className="text-colorTitle font-semibold lg:text-[22px]">10</h4>
        </div>
      </div>
    </div>
  );
};

export default CardWidgets;
