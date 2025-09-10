import React from "react";
import { Button, Tooltip } from "@heroui/react";
import { Download, Share2, Signature } from "lucide-react";
import PdfRender from "@/components/common/pdfRender/pdfRender";
import { useModalContext } from "@/contexts/Modal/ModalContext";

const BlockFiles = () => {
  const { openModal } = useModalContext();
  return (
    <div className="flex flex-col h-screen">
      <div className="header p-3 flex items-center relative z-10 bg-[#f5f7fb]">
        <div className="block-btns p-1 bg-bgCard rounded-xl m-auto flex items-center gap-1">
          <Tooltip
            content={"Signer le document"}
            classNames={{
              content: ["bg-colorTitle border-0 text-white text-xs"],
            }}
          >
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-8 h-8 flex-col leading-[50%] items-center justify-center"
            >
              <Signature size={16} />
            </Button>
          </Tooltip>

          <Tooltip
            content={"Télécharger le document"}
            classNames={{
              content: ["bg-colorTitle border-0 text-white text-xs"],
            }}
          >
           <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-8 h-8 flex-col leading-[50%] items-center justify-center"
          >
            <Download size={16} />
          </Button>
          </Tooltip>
          <Tooltip
            content={"Partager le document"}
            classNames={{
              content: ["bg-colorTitle border-0 text-white text-xs"],
            }}
          >
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
          </Tooltip>
          
          
        </div>
      </div>
      <div className="body flex-grow overflow-y-auto overflow-hidden bg-[#f5f7fb] px-3">
        <PdfRender file={"/files/1.pdf"} />
      </div>
    </div>
  );
};

export default BlockFiles;
