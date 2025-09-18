import { Button, Tabs, Tab } from "@heroui/react";
import { Plus } from "lucide-react";
import CardWidgets from "./cardWidgets";
import BlockViewFolders from "./blockViewFolders";
import BlockViewFoldersInprocess from "./blockViewFoldersInprocess";
import Link from "next/link";
import { useGetListFolders } from "@/hooks/features/folders/hook.list-folders";
import { AnimatedDataLoadError } from "@/components/common/animated-error-states/animated-error-states";
import { UiLoadingData } from "@/components/common/UiLoadingData/UiLoadingData";
import { FolderSchema } from "@/validators/folders/validator.list-folder";
import { useCallback, useEffect, useState } from "react";

const BlockDash = () => {
  const {
    data: folders,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useGetListFolders();
  const [folderList, setfolderList] = useState<FolderSchema[]>([]);

  useEffect(() => {
    if (folders && isLoading === false && isError === false) {
      setfolderList(folders.data);
    }
  }, [folders, isError, isLoading]);

  const handleSearchFolders = useCallback(
    (search: string) => {
      if (search === "") {
        setfolderList(folders?.data || []);
        return;
      }
      setfolderList((prevFolders) =>
        prevFolders.filter((folder: FolderSchema) =>
          folder.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    },
    [folders?.data]
  );

  if (isLoading) {
    return <UiLoadingData />;
  }
  if (isError || !folders) {
    return (
      <AnimatedDataLoadError
        onRetry={refetch}
        retryLoading={isLoading}
        title="Une erreur est survenue"
        showContactSupport={true}
        onContactSupport={() => {
          console.log("contact support");
        }}
        isRetryLoading={isRefetching}
        message="Nous avons rencontré un problème lors du chargement des informations des dossiers. Veuillez réessayer ou contacter le support si le problème persiste."
      />
    );
  }
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
      <CardWidgets
        totalFolders={folders?.data.length || 0}
        inprocessFolders={
          folders?.data.filter(
            (folder: FolderSchema) => folder.status === "EN_COURS"
          ).length
        }
        treatedFolders={
          folders?.data.filter(
            (folder: FolderSchema) => folder.status === "TRAITE"
          ).length
        }
      />
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
          <BlockViewFoldersInprocess
            folders={folderList.filter(
              (folder: FolderSchema) => folder.status === "EN_COURS"
            )}
            onSearch={handleSearchFolders}
          />
        </Tab>
        <Tab key="treated" title="Traités">
          <BlockViewFolders
            folders={folderList.filter(
              (folder: FolderSchema) => folder.status === "TRAITE"
            )}
            onSearch={handleSearchFolders}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default BlockDash;
