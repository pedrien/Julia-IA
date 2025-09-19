import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Avatar,
  Button,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { useCurrentParticipant } from "@/contexts/features/meetings/context.current-participant-meetings-detail";
import { useGetParticipantObservations } from "@/hooks/features/meetings/hook.get-meeting-observations";
import { formatDate, getAvatarUrl } from "@/utils/utils";
import { useParams } from "next/navigation";

const AvisParticipants = () => {
  const { openModal } = useModalContext();
  const { isDrawerOpen, closeDrawer } = useDrawerContext();
  const { currentParticipant, clearCurrentParticipant } =
    useCurrentParticipant();
  const params = useParams();
  const meetingId = params.id as string;

  // Hook pour récupérer les observations du participant
  const {
    data: observations,
    isLoading: isLoadingObservations,
    isError: isErrorObservations,
  } = useGetParticipantObservations(meetingId, currentParticipant?.id || "");

  return (
    <Drawer
      isOpen={isDrawerOpen("AvisParticipants")}
      onClose={() => {
        closeDrawer("AvisParticipants");
        clearCurrentParticipant();
      }}
      size="md"
      radius="none"
    >
      <DrawerContent className="bg-bgCard">
        <DrawerHeader className="border-b border-colorBorderTr">
          {currentParticipant === null ? (
            <Skeleton className="w-full h-[40px] rounded-lg" />
          ) : (
            <div className="flex gap-2 items-center">
              <Avatar
                alt={currentParticipant.name}
                className="shrink-0"
                size="md"
                src={getAvatarUrl(currentParticipant.name)}
              />
              <div className="flex flex-col">
                <span className="text-small text-colorTitle">
                  {currentParticipant.name}
                </span>
                <span className="text-tiny text-colorMuted">
                  {currentParticipant.email}
                </span>
              </div>
            </div>
          )}
        </DrawerHeader>
        <DrawerBody>
          {currentParticipant === null ? (
            <Skeleton className="w-full h-full rounded-lg" />
          ) : (
            <>
              <div className="card p-3 rounded-xl border border-colorBorder border-dashed mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-1">
                    <h4 className="text-colorTitle font-medium text-xs mb-1">
                      Lu
                    </h4>
                    <p className="text-colorMuted text-sm">
                      {currentParticipant.has_read_report &&
                      currentParticipant.read_date
                        ? formatDate(currentParticipant.read_date)
                        : "Non"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-colorTitle font-medium text-xs mb-1">
                      Traité
                    </h4>
                    <p className="text-colorMuted text-sm">
                      {currentParticipant.has_processed_report &&
                      currentParticipant.processed_date
                        ? formatDate(currentParticipant.processed_date)
                        : "Non"}
                    </p>
                  </div>
                </div>
              </div>
              <h4 className="text-colorTitle font-semibold">Observations</h4>
              <div className="flex flex-col gap-3">
                {isLoadingObservations ? (
                  <div className="flex items-center justify-center py-4">
                    <Spinner size="sm" />
                    <span className="ml-2 text-colorMuted text-sm">
                      Chargement des observations...
                    </span>
                  </div>
                ) : isErrorObservations ? (
                  <div className="text-center py-4">
                    <span className="text-colorMuted text-sm">
                      Erreur lors du chargement des observations
                    </span>
                  </div>
                ) : observations &&
                  observations.data &&
                  observations.data.length > 0 ? (
                  observations.data.map((observation, index) => (
                    <div
                      key={index}
                      className="card p-3 rounded-xl bg-[#f8f8f8]"
                    >
                      <p className="text-colorTitle text-sm">
                        {observation.content ||
                          observation.content ||
                          "Observation"}
                      </p>
                      <div className="date text-xs text-end text-colorMuted mt-1">
                        {observation.date_time
                          ? formatDate(observation.date_time)
                          : "Date non disponible"}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <span className="text-colorMuted text-sm">
                      Aucune observation pour ce participant
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button
            className="bg-primaryColor  text-white w-full font-medium"
            onPress={() => openModal("NewObserv")}
            isDisabled
          >
            Laisser une observation
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AvisParticipants;
