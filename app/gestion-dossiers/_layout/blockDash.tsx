import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import CardWidgets from "./cardWidgets";
import BlockViewFolders from "./blockViewFolders";
import Link from "next/link";

const BlockDash = () => {
  return (
    <div className="container-fluid lg:px-7 px-2">
      <div className="flex items-center justify-between lg:mb-4">
        <h2 className="text-colorTitle font-semibold lg:mb-3 mb-4 text-[18px]">
         Gestion des dossiers
        </h2>
        <Button
          className="bg-primaryColor text-white"
          as={Link}
          href="/gestion-dossiers/create"
        >
          <Plus size="18"></Plus>
          Nouveau dossier
        </Button>
      </div>
      <CardWidgets/>
      <BlockViewFolders/>
    </div>
  );
};

export default BlockDash;
