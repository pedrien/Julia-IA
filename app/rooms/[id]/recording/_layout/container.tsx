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

const Content = ({ id }: { id: string }) => {
  const {
    data: meetingDetail,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetMeetingDetailRecording(id);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [chronoResetSignal, setChronoResetSignal] = useState<number>(0);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);

  const handleRecordingStart = () => {
    console.log("Container - Recording started");
    setIsRecording(true);
  };

  const handleRecordingStop = (audioUrl?: string) => {
    console.log("Container - Recording stopped, audioUrl:", audioUrl);
    setIsRecording(false);
    if (audioUrl) {
      setRecordedAudio(audioUrl);
    }
  };

  const handleRecordingDelete = () => {
    console.log("Container - Recording deleted");
    setChronoResetSignal((v) => v + 1);
    if (recordedAudio) {
      URL.revokeObjectURL(recordedAudio);
      setRecordedAudio(null);
    }
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
      <ModalStep recordedAudio={recordedAudio} />
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
