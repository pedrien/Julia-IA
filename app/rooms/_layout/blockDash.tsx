import React from "react";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import CardWidgets from "./cardWidgets";
import TableRooms from "./tableRooms";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import NewRoom from "@/components/features/room/newRoom";
import NewUser from "@/components/features/room/newUser";

const BlockDash = () => {
  const { openModal } = useModalContext();
  return (
    <>
      <div className="container-fluid lg:px-7 px-2">
        <div className="flex items-center justify-between lg:mb-4">
          <h2 className="text-colorTitle font-semibold lg:mb-3 mb-4 text-[18px]">
            Comptes rendus des réunions
          </h2>
          <Button
            className="bg-primaryColor text-white"
            onPress={() => openModal("ModalNewRoom")}
          >
            <Plus size="18"></Plus>
            Nouvelle réunion
          </Button>
        </div>
        <div className="grid grid-col-1 gap-3 lg:gap-4">
          <CardWidgets />
          <TableRooms />
        </div>
      </div>
      <NewRoom />
      <NewUser />
    </>
  );
};

export default BlockDash;
