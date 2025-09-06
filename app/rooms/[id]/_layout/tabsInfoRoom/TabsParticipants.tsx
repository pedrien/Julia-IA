"use client";

import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { useGetMeetingParticipants } from "@/hooks/features/meetings/hook.get-meeting-participants";
import { Avatar, Button, Chip, Spinner, Tooltip } from "@heroui/react";
import { Plus, RefreshCcw } from "lucide-react";

const TabsParticipants = ({ id }: { id: string }) => {
  const { openDrawer } = useDrawerContext();
  const { openModal } = useModalContext();
  const {
    data: participants,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useGetMeetingParticipants(id);

  // Fonction pour obtenir la couleur du statut de lecture
  const getReadStatusColor = (hasRead: boolean) => {
    return hasRead
      ? "bg-[#5078f01b] text-[#5078f0]"
      : "bg-[#f08d501b] text-[#f08c50]";
  };

  // Fonction pour obtenir la couleur du statut de traitement
  const getProcessedStatusColor = (hasProcessed: boolean) => {
    return hasProcessed
      ? "bg-[#2ac66618] text-[#2ac667]"
      : "bg-[#e829291b] text-[#e82929]";
  };

  // Fonction pour obtenir le texte du statut de lecture
  const getReadStatusText = (hasRead: boolean) => {
    return hasRead ? "Lu" : "Non lu";
  };

  // Fonction pour obtenir le texte du statut de traitement
  const getProcessedStatusText = (hasProcessed: boolean) => {
    return hasProcessed ? "Traité" : "Non traité";
  };

  // Fonction pour générer l'URL de l'avatar
  const getAvatarUrl = (name: string) => {
    // Utiliser une URL d'avatar basée sur le nom ou une URL par défaut
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&color=fff&size=40`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Spinner />
      </div>
    );
  }
  if (isError || !participants) {
    return (
      <div className="flex items-center flex-col justify-center gap-5 h-[300px]">
        <span className="text-colorTitle text-center">
          Une erreur est survenue lors de la récupération des participants
        </span>
        <Button
          className="bg-transparent border border-colorBorder  text-colorTitle text-xs p-0 min-w-0 h-[26px] w-[26px]"
          onPress={() => refetch()}
          isLoading={isRefetching}
        >
          <RefreshCcw size={14}></RefreshCcw>
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-colorTitle font-semibold mb-3 mt-2">
          Participants ({participants.participants.length})
        </h3>
        <div className="flex flex-col gap-4">
          {participants.participants.length > 0 ? (
            participants.participants.map((participant) => (
              <div
                key={participant.id}
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => openDrawer("AvisParticipants")}
              >
                <Avatar
                  alt={participant.name}
                  className="shrink-0"
                  size="md"
                  src={getAvatarUrl(participant.name)}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-small text-colorTitle">
                      {participant.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <Chip
                        className={`${getReadStatusColor(
                          participant.has_read_report || false
                        )} text-[10px]`}
                        size="sm"
                      >
                        {getReadStatusText(
                          participant.has_read_report || false
                        )}
                      </Chip>
                      <Chip
                        className={`${getProcessedStatusColor(
                          participant.has_processed_report || false
                        )} text-[10px]`}
                        size="sm"
                      >
                        {getProcessedStatusText(
                          participant.has_processed_report || false
                        )}
                      </Chip>
                    </div>
                  </div>
                  <span className="text-tiny text-colorMuted">
                    {participant.email}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <span className="text-colorMuted text-sm">
                Aucun participant interne
              </span>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3 mt-2">
          <h3 className="text-colorTitle font-semibold">
            Invités ({participants.guest_participants.length})
          </h3>
          <Tooltip
            content={"Ajouter"}
            classNames={{
              content: ["bg-colorTitle border-0 text-white text-xs"],
            }}
          >
            <Button
              className="bg-transparent border border-colorBorder  text-colorTitle text-xs p-0 min-w-0 h-[26px] w-[26px]"
              onPress={() => openModal("NewInvite")}
            >
              <Plus size={14}></Plus>
            </Button>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-4">
          {participants.guest_participants.length > 0 ? (
            participants.guest_participants.map((participant) => (
              <div
                key={participant.id}
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => openDrawer("AvisParticipants")}
              >
                <Avatar
                  alt={participant.name}
                  className="shrink-0"
                  size="md"
                  src={getAvatarUrl(participant.name)}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-small text-colorTitle">
                      {participant.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <Chip
                        className={`${getReadStatusColor(
                          participant.has_read_report || false
                        )} text-[10px]`}
                        size="sm"
                      >
                        {getReadStatusText(
                          participant.has_read_report || false
                        )}
                      </Chip>
                      <Chip
                        className={`${getProcessedStatusColor(
                          participant.has_processed_report || false
                        )} text-[10px]`}
                        size="sm"
                      >
                        {getProcessedStatusText(
                          participant.has_processed_report || false
                        )}
                      </Chip>
                    </div>
                  </div>
                  <span className="text-tiny text-colorMuted">
                    {participant.email}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <span className="text-colorMuted text-sm">
                Aucun participant externe
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabsParticipants;
