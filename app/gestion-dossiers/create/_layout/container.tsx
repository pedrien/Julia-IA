"use client";
import ViewApp from "@/components/common/containers/ViewApp";
import BlockDash from "./blockDash";
import { FolderCreationProvider } from "@/contexts/features/folder/context.folder-creation";

const Container = () => {
  return (
    <ViewApp>
      <FolderCreationProvider>
        <BlockDash />
      </FolderCreationProvider>
    </ViewApp>
  );
};

export default Container;
