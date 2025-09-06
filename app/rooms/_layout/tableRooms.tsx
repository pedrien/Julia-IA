import React, { useState, useMemo } from "react";
import { Input, Button, Chip } from "@heroui/react";
import { Search, EllipsisVertical, FileText } from "lucide-react";
import Link from "next/link";
import { useGetListMeetings } from "@/hooks/features/meetings/hook.list-meetings";
import { helpEnumMeetingStatus } from "@/types/enums/meetings/enum.meeting-status";

const TableRooms = () => {
  const { data: meetings, isLoading, error } = useGetListMeetings();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les meetings selon la recherche
  const filteredMeetings = useMemo(() => {
    if (!meetings?.data) return [];
    return meetings.data.filter((meeting) =>
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [meetings?.data, searchTerm]);

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "TRAITE":
        return "bg-[#2ac66618] text-[#2ac667]";
      case "EN_COURS":
        return "bg-[#f08d501b] text-[#f08c50]";
      case "EN_ATTENTE":
        return "bg-[#ecb4321d] text-[#ecb532]";
      case "LU":
        return "bg-[#6366f118] text-[#6366f1]";
      default:
        return "bg-[#6b728018] text-[#6b7280]";
    }
  };

  // Fonction pour formater la durée
  const formatDuration = (duration: number) => {
    if (duration < 60) {
      return `${duration}min`;
    }
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return minutes > 0 ? `${hours}h${minutes}min` : `${hours}h`;
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="card bg-bgCard rounded-2xl shadow-[0_5px_18px_#00000005] p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryColor mx-auto"></div>
          <p className="text-colorMuted mt-2">Chargement des réunions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-bgCard rounded-2xl shadow-[0_5px_18px_#00000005] p-8">
        <div className="text-center">
          <p className="text-red-500">Erreur lors du chargement des réunions</p>
          <p className="text-colorMuted text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-bgCard rounded-2xl shadow-[0_5px_18px_#00000005]">
      <div className="flex items-center justify-between lg:mb-4 mb-6 px-4 pt-4">
        <h2 className="text-colorTitle font-semibold">
          Liste des comptes rendus
        </h2>
        <div>
          <Input
            type="text"
            variant="bordered"
            placeholder="Trouvez une réunion"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            classNames={{
              inputWrapper:
                "bg-transparent border-colorBorder border-[1px] shadow-none",
            }}
            startContent={<Search size={20} />}
          />
        </div>
      </div>
      <table className="table w-full table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date</th>
            <th>Durée</th>
            <th>Participants</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting) => (
              <tr key={meeting.id} className="hover:bg-bgGray">
                <td>
                  <Link href={`/rooms/${meeting.id}`}>
                    <div className="flex items-center gap-1">
                      <div className="icon text-colorMuted">
                        <FileText size={18} />
                      </div>
                      <span className="text-colorTitle">{meeting.title}</span>
                    </div>
                  </Link>
                </td>
                <td>
                  <span>{formatDate(meeting.date_meeting)}</span>
                </td>
                <td>
                  <span>{formatDuration(meeting.duration)}</span>
                </td>
                <td>
                  <span>{meeting.total_participants}</span>
                </td>
                <td>
                  <Chip
                    className={`${getStatusColor(meeting.status)} text-[12px]`}
                    size="sm"
                  >
                    {helpEnumMeetingStatus(meeting.status)}
                  </Chip>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Button className="min-w-0 bg-transparent hover:bg-bgGray text-colorTitle p-0 w-[32px] h-[32px]">
                      <EllipsisVertical size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-8">
                <div className="text-colorMuted">
                  {searchTerm
                    ? "Aucune réunion trouvée"
                    : "Aucune réunion disponible"}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableRooms;
