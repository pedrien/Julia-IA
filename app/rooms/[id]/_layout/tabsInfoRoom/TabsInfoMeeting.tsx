"use client";

import React from "react";
import { useGetMeetingDetail } from "@/hooks/features/meetings/hook.get-meeting-detail";
import { Button, Spinner } from "@heroui/react";
import { RefreshCcw } from "lucide-react";

const TabsInfoMeeting = ({ id }: { id: string }) => {
  const {
    data: meetingDetail,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useGetMeetingDetail(id);

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fonction pour formater la durée
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "EN_ATTENTE":
        return "bg-[#f08d501b] text-[#f08c50]";
      case "EN_COURS":
        return "bg-[#5078f01b] text-[#5078f0]";
      case "TRAITE":
        return "bg-[#2ac66618] text-[#2ac667]";
      case "LU":
        return "bg-[#8b5cf61b] text-[#8b5cf6]";
      default:
        return "bg-[#6b72801b] text-[#6b7280]";
    }
  };

  // Fonction pour obtenir le texte du statut
  const getStatusText = (status: string) => {
    switch (status) {
      case "EN_ATTENTE":
        return "En attente";
      case "EN_COURS":
        return "En cours";
      case "TRAITE":
        return "Traité";
      case "LU":
        return "Lu";
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Spinner classNames={{
          circle1: "border-b-primaryColor",
          circle2: "border-b-primaryColor",
        }}/>
      </div>
    );
  }

  if (isError || !meetingDetail) {
    return (
      <div className="flex items-center flex-col justify-center gap-5 h-[300px]">
        <span className="text-colorTitle text-center">
          Une erreur est survenue lors de la récupération des informations de la
          réunion
        </span>
        <Button
          className="bg-transparent border border-colorBorder text-colorTitle text-xs p-0 min-w-0 h-[26px] w-[26px]"
          onPress={() => refetch()}
          isLoading={isRefetching}
        >
          <RefreshCcw size={14}></RefreshCcw>
        </Button>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-colorTitle font-semibold mb-3 mt-2">
        Infos générales
      </h3>
      <div className="card p-3 rounded-xl border border-colorBorder border-dashed">
        <div className="flex flex-col gap-3">
          <div>
            <h4 className="text-colorTitle font-medium text-sm mb-1">Titre</h4>
            <p className="text-colorMuted text-sm">
              {meetingDetail.title || "Aucun titre disponible"}
            </p>
          </div>
          <div>
            <h4 className="text-colorTitle font-medium text-sm mb-1">Date</h4>
            <p className="text-colorMuted text-sm">
              {formatDate(meetingDetail.date_meeting)}
            </p>
          </div>
          <div>
            <h4 className="text-colorTitle font-medium text-sm mb-1">Durée</h4>
            <p className="text-colorMuted text-sm">
              {formatDuration(meetingDetail.duration)}
            </p>
          </div>
          <div>
            <h4 className="text-colorTitle font-medium text-sm mb-1">
              Participants
            </h4>
            <p className="text-colorMuted text-sm">
              {meetingDetail.total_participants} participant(s)
            </p>
          </div>
          <div>
            <h4 className="text-colorTitle font-medium text-sm mb-1">Statut</h4>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  meetingDetail.status
                )}`}
              >
                {getStatusText(meetingDetail.status)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsInfoMeeting;
