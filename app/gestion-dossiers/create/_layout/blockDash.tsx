import React from "react";
import Sidebar from "./sidebar/sidebar";
import { FileX } from "lucide-react";
import PdfRender from "@/components/common/pdfRender/pdfRender";

const BlockDash = () => {
  return (
    <div className="block-scanner min-h-screen bg-bgCard py-2">
        <Sidebar></Sidebar>
        <div className="block-view-file lg:ml-[450px] min-h-screen px-3 bg-background rounded-tl-3xl rounded-bl-3xl py-4">
          {/* <div className="flex flex-col justify-center items-center h-screen">
          <FileX size={55} className="text-colorMuted opacity-50"></FileX>
          <div className="w-full text-center mt-4">
            <h2 className="text-colorTitle font-semibold lg:text-2xl mb-1">Aucun fichier importé</h2>
            <p className="text-colorMuted">Le document numérisé apparaîtra ici.</p>
          </div>
        </div> */}
          <PdfRender file={"/files/1.pdf"} />
        </div>
      </div>
  );
};

export default BlockDash;
