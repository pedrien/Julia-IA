import React from "react";
import { Clock, CheckCircle, FileText } from "lucide-react";

const CardWidgets = ({
  totalMeetings,
  readMeetings,
  completedMeetings,
}: {
  totalMeetings: number;
  readMeetings: number;
  completedMeetings: number;
}) => {
  return (
    <div className="grid grid-cols-12 gap-3 lg:gap-4">
      <div className="col-span-12 lg:col-span-4 2xl:col-span-4">
        <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="icon text-primaryColor flex items-center justify-center w-[50px] h-[50px] bg-[#782efa45]  rounded-lg ">
              <FileText className="lg:w-7 lg:h-7"></FileText>
            </div>
            <div>
              <p className="text-colorMuted text-sm mb-1">Total</p>
              <h4 className="text-colorTitle font-semibold lg:text-[22px]">
                {totalMeetings}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 2xl:col-span-4">
        <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="icon text-[#5078f0] bg-[#5078f045]  flex items-center justify-center w-[50px] h-[50px] rounded-lg">
              <Clock className="lg:w-7 lg:h-7"></Clock>
            </div>
            <div>
              <p className="text-colorMuted text-sm mb-1">Lus</p>
              <h4 className="text-colorTitle font-semibold lg:text-[22px]">
                {readMeetings}
              </h4>
            </div>
            <p className="text-colorMuted"></p>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 2xl:col-span-4">
        <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="icon text-[#2ac693] bg-[#2ac69345]  flex items-center justify-center w-[50px] h-[50px] rounded-lg">
              <CheckCircle className="lg:w-7 lg:h-7"></CheckCircle>
            </div>
            <div>
              <p className="text-colorMuted text-sm mb-1">Traités</p>
              <h4 className="text-colorTitle font-semibold lg:text-[22px]">
                {completedMeetings}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWidgets;
