"use client";

import React from "react";
import Sidebar from "./sidebar/sidebar";
import { FileText } from "lucide-react";
import PdfRender from "@/components/common/pdfRender/pdfRender";
import { useFolderCreation } from "@/contexts/features/folder/context.folder-creation";

const BlockDash = () => {
  const { selectedFile } = useFolderCreation();

  return (
    <div className="block-scanner min-h-screen bg-bgCard py-2">
      <Sidebar />
      <div className="block-view-file lg:ml-[450px] min-h-screen px-3 bg-background rounded-tl-3xl rounded-bl-3xl py-4">
        {selectedFile ? (
          <PdfRender file={selectedFile} />
        ) : (
          <div className="flex flex-col justify-center items-center h-full min-h-[600px]">
            <div className="bg-gray-50 rounded-full p-6 mb-6">
              <FileText size={60} className="text-colorMuted opacity-60" />
            </div>
            <div className="w-full text-center max-w-md">
              <h2 className="text-colorTitle font-semibold text-xl lg:text-2xl mb-3">
                Aucun fichier importé
              </h2>
              <p className="text-colorMuted text-sm lg:text-base leading-relaxed">
                Sélectionnez un fichier PDF dans le panneau de gauche pour voir
                l&apos;aperçu du document ici.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockDash;
