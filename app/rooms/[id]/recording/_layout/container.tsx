"use client";
import ViewApp from "@/components/common/containers/ViewApp";
import { useState } from "react";
import Chrono from "./chrono";
import InfoRoom from "./drawers/infoRoom";
import ParticipantRoom from "./drawers/participantRoom";
import ModalStep from "./modalStep/modaltStep";
import WidgetRecording from "./widgetRecording";
import { useGetMeetingDetailRecording } from "@/hooks/features/meetings/hook.get-meeting-detail";
import { UiLoadingData } from "@/components/common/UiLoadingData/UiLoadingData";
import { AnimatedDataLoadError } from "@/components/common/animated-error-states/animated-error-states";
import ModalConfirmation from "@/components/common/modals/ModalConfirmation/ModalConfirmation";
import { useEndMeeting } from "@/hooks/features/meetings/hook.end-meeting";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { useLoading } from "@/contexts/Overlay/LoadingContext";

const Content = ({ id }: { id: string }) => {
  const { openModal } = useModalContext();
  const { startLoading, stopLoading } = useLoading();
  const {
    data: meetingDetail,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetMeetingDetailRecording(id);
  const [audioFileState, setAudioFileState] = useState<File | null>(null);

  const [isModalOpenConfirmation, setIsModalOpenConfirmation] =
    useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [chronoResetSignal, setChronoResetSignal] = useState<number>(0);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const { mutate: endMeeting } = useEndMeeting({
    onSuccessCallback: () => {
      setIsRecording(false);
      stopLoading();
      openModal("ModalStep");
    },
  });

  const handleRecordingStart = () => {
    setIsRecording(true);
  };

  const handleRecordingStop = (audioUrl?: string) => {
    setIsRecording(false);
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

          setIsModalOpenConfirmation(true);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du blob audio:", error);
        });
    }
  };

  const handleRecordingDelete = () => {
    setChronoResetSignal((v) => v + 1);
    if (recordedAudio) {
      URL.revokeObjectURL(recordedAudio);
      setRecordedAudio(null);
    }
    setAudioFileState(null);
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
      <div className="flex flex-col block-recording h-screen bg-linear-to-b from-[#ece2fd] to-white">
        <div className="body flex-grow flex flex-col">
          <div className="m-auto flex flex-col justify-center items-center gap-3">
            <div className="lg:w-[170px] lg:h-[170px] rounded-full overflow-hidden">
              <video
                src="/videos/3.mp4"
                className="w-full h-full object-cover"
                playsInline
                loop
                autoPlay
                muted
              ></video>
            </div>
            <Chrono isRunning={isRecording} resetSignal={chronoResetSignal} />
          </div>
        </div>
        <div className="footer lg:py-10">
          <WidgetRecording
            onRecordingStart={handleRecordingStart}
            onRecordingStop={handleRecordingStop}
            onRecordingDelete={handleRecordingDelete}
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
            });
          }
          setIsModalOpenConfirmation(false);
        }}
        title="Confirmation"
        message="Voulez-vous vraiment enregistrer cette réunion ?"
        labelConfirm="Enregistrer"
        labelCancel="Annuler"
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
