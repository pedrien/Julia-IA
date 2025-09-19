"use client";
import { UiLoadingData } from "@/components/common/UiLoadingData/UiLoadingData";
import { AnimatedDataLoadError } from "@/components/common/animated-error-states/animated-error-states";
import ViewApp from "@/components/common/containers/ViewApp";
import ModalConfirmation from "@/components/common/modals/ModalConfirmation/ModalConfirmation";
import ModalShareRapport from "@/components/features/room/modals/ModalShareRapport";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { useLoading } from "@/contexts/Overlay/LoadingContext";
import { useEndMeeting } from "@/hooks/features/meetings/hook.end-meeting";
import { useGetMeetingDetailRecording } from "@/hooks/features/meetings/hook.get-meeting-detail-recording";
import { showToast } from "@/utils/utils.toast";
import { Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Chrono from "./chrono";
import InfoRoom from "./drawers/infoRoom";
import ParticipantRoom from "./drawers/participantRoom";
import ModalStep from "./modalStep/modaltStep";
import WidgetRecording from "./widgetRecording";

const Content = ({ id }: { id: string }) => {
  const { openModal } = useModalContext();
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading();
  const {
    data: meetingDetail,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetMeetingDetailRecording(id);
  const [audioFileState, setAudioFileState] = useState<File | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [isModalOpenConfirmation, setIsModalOpenConfirmation] =
    useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [chronoResetSignal, setChronoResetSignal] = useState<number>(0);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const { mutate: endMeeting } = useEndMeeting({
    onSuccessCallback: () => {
      setIsRecording(false);
      stopLoading();
      openModal("ModalStep");
    },
  });

  const handleRecordingStart = () => {
    if (isRecording) {
      return;
    }
    if (audioFileState || recordedAudio) {
      showToast({
        title: "Enregistrement déjà présent",
        description:
          "Supprimez l'enregistrement existant avant d'en lancer un nouveau.",
        color: "warning",
      });
      return;
    }
    setIsRecording(true);
  };

  const handleRecordingStop = (audioUrl?: string) => {
    setIsRecording(false);
    if (!audioUrl) {
      showToast({
        title: "Arrêt impossible",
        description:
          "Nous n'avons pas pu récupérer l'audio. Veuillez réessayer.",
        color: "danger",
      });
      // On ne modifie pas l'état des fichiers afin de permettre un nouvel essai
      return;
    }
    if (audioUrl) {
      // Récupérer le blob depuis l'URL
      fetch(audioUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Créer un fichier valide à partir du blob
          const audioFile = new File([blob], "recording.webm", {
            type: "audio/webm",
          });
          console.log("Container - Audio file:", audioFile);
          setRecordedAudio(audioUrl);
          setAudioFileState(audioFile);

          // Créer un élément audio temporaire pour obtenir la durée
          const audio = new Audio(audioUrl);
          audio.addEventListener("loadedmetadata", () => {
            const durationInSeconds = Math.round(audio.duration);
            console.log(
              "Container - Audio duration:",
              durationInSeconds,
              "seconds"
            );
            setAudioDuration(durationInSeconds);
            setDuration(durationInSeconds); // Mettre à jour la durée pour l'API
          });

          audio.addEventListener("error", () => {
            console.warn(
              "Impossible de charger les métadonnées audio, utilisation de la durée du chrono"
            );
            // Fallback: utiliser la durée du chrono si disponible
            setAudioDuration(duration);
          });

          setIsModalOpenConfirmation(true);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du blob audio:", error);
          showToast({
            title: "Erreur d'enregistrement",
            description:
              "La récupération de l'audio a échoué. Supprimez et recommencez.",
            color: "danger",
          });
          // Réinitialiser pour permettre un nouvel essai propre
          handleRecordingDelete();
        });
    }
  };

  const handleRecordingPause = (pauseState: boolean) => {
    setIsPaused(pauseState);
  };

  const handleRecordingDelete = () => {
    setChronoResetSignal((v) => v + 1);
    if (recordedAudio) {
      URL.revokeObjectURL(recordedAudio);
      setRecordedAudio(null);
    }
    setAudioFileState(null);
    setAudioDuration(0);
    setDuration(0);
    setIsPaused(false);
  };

  if (isLoading) {
    return <UiLoadingData />;
  }
  if (isError || !meetingDetail) {
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
        message="Nous avons rencontré un problème lors du chargement des informations de la réunion. Veuillez réessayer ou contacter le support si le problème persiste."
      />
    );
  }

  return (
    <>
      <div className="flex flex-col block-recording h-screen bg-linear-to-b from-[#782efa36] to-bgCard">
        <div className="body flex-grow flex flex-col">
          <div className="m-auto flex flex-col justify-center items-center gap-3">
            <div className="relative flex items-center justify-center mb-6 lg:mb-10">
              <div className="relative z-10 icon-recording w-[140px] h-[140px] text-primaryColor bg-[#782efa29] dark:bg-[#ffffff12] dark:text-white backdrop-blur-[34px] rounded-full flex items-center justify-center">
                <Mic size={50}></Mic>
                <div
                  className={`absolute w-[140px] h-[140px] rounded-full border-2 border-[#782efa29] dark:border-white/20 ${
                    isRecording ? "animate-slow-pulse flex" : "hidden"
                  }`}
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className={`absolute w-[180px] h-[180px]  rounded-full border-2 border-[#782efa29] dark:border-white/20 ${
                    isRecording ? "animate-slow-pulse flex" : "hidden"
                  }`}
                  style={{ animationDelay: ".5s" }}
                ></div>
                <div
                  className={`absolute w-[220px] h-[220px] rounded-full border-2 border-[#782efa29] dark:border-white/20 ${
                    isRecording ? "animate-slow-pulse flex" : "hidden"
                  }`}
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className={`absolute w-[220px] h-[220px] rounded-full border-2 border-[#782efa29] dark:border-white/20 ${
                    isRecording ? "animate-slow-pulse flex" : "hidden"
                  }`}
                  style={{ animationDelay: "1.5s" }}
                ></div>
              </div>
            </div>
            <Chrono
              isRunning={isRecording && !isPaused}
              resetSignal={chronoResetSignal}
            />
          </div>
        </div>
        <div className="footer lg:py-10">
          <WidgetRecording
            onRecordingStart={handleRecordingStart}
            onRecordingStop={handleRecordingStop}
            onRecordingDelete={handleRecordingDelete}
            onRecordingPause={handleRecordingPause}
            id={id}
          />
        </div>
      </div>
      <ParticipantRoom participants={meetingDetail.data.participants} />
      <InfoRoom meetingDetail={meetingDetail.data} />
      <ModalStep
        recordedAudio={recordedAudio}
        meetingId={id}
        audioFile={audioFileState}
      />
      <ModalConfirmation
        isOpen={isModalOpenConfirmation}
        onCancel={() => setIsModalOpenConfirmation(false)}
        onConfirm={() => {
          if (audioFileState) {
            startLoading();
            endMeeting({
              id_meeting: id,
              audio_file: audioFileState,
              duration: audioDuration || duration, // Utiliser la durée audio si disponible, sinon la durée du chrono
            });
          }
          setIsModalOpenConfirmation(false);
        }}
        title="Confirmation"
        message="Voulez-vous vraiment enregistrer cette réunion ?"
        labelConfirm="Enregistrer"
        labelCancel="Annuler"
      />
      <ModalShareRapport
        participants={meetingDetail.data.participants}
        meetingId={id}
        onSuccessShare={() => {
          router.push(`/rooms/${id}`);
        }}
      />
    </>
  );
};
const Container = ({ id }: { id: string }) => {
  return (
    <ViewApp>
      <Content id={id}></Content>
    </ViewApp>
  );
};

export default Container;
