import React from "react";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import CardWidgets from "./cardWidgets";
import TableRooms from "./tableRooms";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import NewRoom from "@/components/features/room/newRoom";
import NewUser from "@/components/features/room/newUser";
import { useGetListMeetings } from "@/hooks/features/meetings/hook.list-meetings";
import { AnimatedDataLoadError } from "@/components/common/animated-error-states/animated-error-states";
import { UiLoadingData } from "@/components/common/UiLoadingData/UiLoadingData";

const BlockDash = () => {
  const { openModal } = useModalContext();
  const {
    data: meetings,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetListMeetings();

  if (isLoading) {
    return <UiLoadingData />;
  }
  if (isError || !meetings) {
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
        message="Nous avons rencontré un problème lors du chargement des informations des réunions. Veuillez réessayer ou contacter le support si le problème persiste."
      />
    );
  }

  return (
    <>
      <div className="container-fluid lg:px-7 px-2">
        <div className="flex items-center justify-between lg:mb-4">
          <h2 className="text-colorTitle font-semibold lg:mb-3 mb-4 text-[18px]">
            Compte rendus des réunions
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
          <CardWidgets
            totalMeetings={meetings.data.length}
            readMeetings={
              meetings.data.filter((meeting) => meeting.status === "CANCELLED")
                .length
            }
            completedMeetings={
              meetings.data.filter((meeting) => meeting.status === "COMPLETED")
                .length
            }
          />
          <TableRooms />
        </div>
      </div>
      <NewRoom />
      <NewUser />
    </>
  );
};

export default BlockDash;
