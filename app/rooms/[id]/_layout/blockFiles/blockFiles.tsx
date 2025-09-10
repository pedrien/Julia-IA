import React from "react";
import { Button, Progress } from "@heroui/react";
import { Play, Undo, Redo, Download, Volume2, Share2 } from "lucide-react";
import PdfRender from "@/components/common/pdfRender/pdfRender";
import { useModalContext } from "@/contexts/Modal/ModalContext";

const BlockFiles = () => {
  const { openModal } = useModalContext();
  return (
    <div className="flex flex-col h-screen">
      <div className="header p-3 flex items-center relative z-10 bg-[#f5f7fb]">
        <div className="block-btns p-1 bg-bgCard rounded-xl m-auto flex items-center gap-1">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-8 h-8 flex-col leading-[50%] items-center justify-center"
          >
            <Download size={16} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-8 h-8 flex-col leading-[50%] items-center justify-center"
            onPress={() => {
              openModal("ModalShare");
            }}
          >
            <Share2 size={16} />
          </Button>
        </div>
      </div>
      <div className="body flex-grow overflow-y-auto overflow-hidden bg-[#f5f7fb] px-3">
        <PdfRender file={"/files/1.pdf"} />
      </div>
      <div className="footer p-3 bg-[#f5f7fb] relative z-10">
        <div className="absolute w-full h-[40%] top-[-40px] left-0 -z-10" style={{background:"linear-gradient(to bottom, transparent,#f5f7fb)"}}></div>
        <div className="card p-3 rounded-xl bg-bgCard">
          <div className="flex items-center gap-3">
            <span className="currentTime text-sm text-colorMuted">00:00</span>
            <Progress
              //   value={progress}
              className="w-full"
              classNames={{
                indicator: "bg-primaryColor",
                track: "h-[7px]",
              }}
            />
            <span className="timeAudio text-sm text-colorMuted">00:00</span>
          </div>
          <div className="grid grid-cols-3 items-center justify-between gap-2 mt-2">
            <div className="flex items-center gap-3">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-9 h-9 flex-col leading-[50%] items-center justify-center"
              >
                <Download size={20} />
              </Button>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-8 h-8 flex-col leading-[50%] items-center justify-center pb-1"
              >
                <Undo size={16} />
                10
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-primaryColor text-white min-w-0 w-11 h-11"
              >
                <Play size={22} />
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-transparent text-colorTitle hover:bg-bgGray font-medium min-w-0 w-8 h-8 flex-col leading-[50%] items-center justify-center pb-1"
              >
                <Redo size={16} />
                10
              </Button>
            </div>
            <div className="flex items-center justify-end gap-1">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-9 h-9 flex-col leading-[50%] items-center justify-center"
              >
                <Volume2 size={20} />
              </Button>
              <div className="w-16">
                <Progress
                  //   value={progress}
                  className="w-full"
                  classNames={{
                    indicator: "bg-primaryColor",
                    track: "h-[6px]",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockFiles;
