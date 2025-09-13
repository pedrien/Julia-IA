import { Button, Tabs, Tab } from "@heroui/react";
import { Plus } from "lucide-react";
import CardWidgets from "./cardWidgets";
import BlockViewFolders from "./blockViewFolders";
import BlockViewFoldersInprocess from "./blockViewFoldersInprocess";
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
      <CardWidgets />
      <Tabs
        aria-label="Options"
        classNames={{
          base: "lg:justify-center w-full mt-4",
          cursor: "bg-bgGray dark:bg-bgGray shadow-none rounded-lg",
          tab: "bg-transparent",
          tabList: "bg-bgCard gap-1 rounded-none p-1 rounded-xl",
          tabContent:
            "text-darkenGreen group-data-[selected=true]:text-darkenGreen group-data-[selected=true]:font-medium",
        }}
      >
        <Tab key="inprocess" title="En cours">
          <BlockViewFoldersInprocess/>
        </Tab>
        <Tab key="treated" title="Traités">
          <BlockViewFolders />
        </Tab>
      </Tabs>
    </div>
  );
};

export default BlockDash;
