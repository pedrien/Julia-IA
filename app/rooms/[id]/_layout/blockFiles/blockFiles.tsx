import React, {
  useState,
  useRef,
  useEffect,
  useTransition,
  useCallback,
} from "react";
import { Button, Spinner } from "@heroui/react";
import {
  Play,
  Pause,
  Undo,
  Redo,
  Download,
  Volume2,
  VolumeX,
  Share2,
} from "lucide-react";
import PdfRender from "@/components/common/pdfRender/pdfRender";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { useGetMeetingDocuments } from "@/hooks/features/meetings/hook.get-meeting-documents";
import { AnimatedDataLoadError } from "@/components/common/animated-error-states/animated-error-states";
import { UiLoadingData } from "@/components/common/UiLoadingData/UiLoadingData";
import { useFetchPdf } from "@/hooks/features/meetings/hook.fetch-pdf";
import PdfView from "@/components/common/PdfView/PdfView";
import { ENV } from "@/env";

const BlockFiles = ({ id }: { id: string }) => {
  const { openModal } = useModalContext();
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    data: meetingDocument,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetMeetingDocuments(id);
  const { mutate: fetchPdf, error } = useFetchPdf({
    onSuccessCallback: (data) => {
      console.log("PDF fetched successfully via hook:", data);
      if (
        data &&
        typeof data === "object" &&
        "data" in data &&
        data.data &&
        typeof data.data === "object" &&
        "data" in data.data
      ) {
        console.log("PDF fetched successfully via hook:", data.data);
        const dataBuffer = data.data as unknown as ArrayBuffer;
        setPdfData(dataBuffer);
      }
    },
  });

  // États pour le lecteur audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Fonctions pour le lecteur audio
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        duration
      );
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };

  const downloadAudio = () => {
    if (meetingDocument?.url_recording) {
      const link = document.createElement("a");
      link.href = ENV.NEXT_PUBLIC_BASED_API_URL + meetingDocument.url_recording;
      link.download = `meeting-${id}-recording.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadReport = () => {
    if (meetingDocument?.url_report) {
      const link = document.createElement("a");
      link.href = ENV.NEXT_PUBLIC_BASED_API_URL + meetingDocument.url_report;
      link.download = `meeting-${id}-report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const handleFetchPdf = useCallback(() => {
    if (meetingDocument?.url_report) {
      startTransition(() => {
        fetchPdf({
          url: ENV.NEXT_PUBLIC_BASED_API_URL + meetingDocument.url_report,
        });
      });
    }
  }, [meetingDocument?.url_report, fetchPdf]);

  // Effets pour gérer les événements audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoadingAudio(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadStart = () => {
      setIsLoadingAudio(true);
    };

    const handleCanPlay = () => {
      setIsLoadingAudio(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [meetingDocument?.url_recording]);

  useEffect(() => {
    if (meetingDocument && !isLoading && !isError) {
      handleFetchPdf();
    }
  }, [meetingDocument, isLoading, isError, handleFetchPdf]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen">
        <UiLoadingData />
      </div>
    );
  }
  if (isError || !meetingDocument) {
    return (
      <div className="flex flex-col h-screen">
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
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Élément audio caché */}
      <audio
        ref={audioRef}
        src={ENV.NEXT_PUBLIC_BASED_API_URL + meetingDocument?.url_recording}
        preload="metadata"
      />

      {/* Styles pour les sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div className="header p-3 flex items-center relative z-10 bg-background">
        <div className="block-btns p-1 bg-bgCard rounded-xl m-auto flex items-center gap-1">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-8 h-8 flex-col leading-[50%] items-center justify-center"
            onPress={downloadReport}
          >
            <Download size={16} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-8 h-8 flex-col leading-[50%] items-center justify-center"
            onPress={() => {
              openModal("ModalShare");
            }}
          >
            <Share2 size={16} />
          </Button>
        </div>
      </div>
      <div className="body flex-grow overflow-auto bg-[#f5f7fb]">
        {isPending || !pdfData ? (
          <div className="flex flex-col  items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        ) : (
          <PdfView arrayBuffer={pdfData} />
        )}
      </div>
      <div className="footer p-3 bg-background relative z-10">
        <div
          className="absolute w-full h-[40%] top-[-40px] left-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent,var(--background))",
          }}
        ></div>
        <div className="card p-3 rounded-xl bg-bgCard">
          <div className="flex items-center gap-3">
            <span className="currentTime text-sm text-colorMuted">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-bgGray rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
                    (currentTime / duration) * 100
                  }%, #e5e7eb ${
                    (currentTime / duration) * 100
                  }%, #e5e7eb 100%)`,
                }}
              />
            </div>
            <span className="timeAudio text-sm text-colorMuted">
              {formatTime(duration)}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center justify-between gap-2 mt-2">
            <div className="flex items-center gap-3">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-9 h-9 flex-col leading-[50%] items-center justify-center"
                onPress={downloadAudio}
                isDisabled={!meetingDocument?.url_recording}
              >
                <Download size={20} />
              </Button>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-8 h-8 flex-col leading-[50%] items-center justify-center pb-1"
                onPress={skipBackward}
                isDisabled={!meetingDocument?.url_recording || isLoadingAudio}
              >
                <Undo size={16} />
                10
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-primaryColor text-white min-w-0 w-11 h-11"
                onPress={togglePlayPause}
                isDisabled={!meetingDocument?.url_recording || isLoadingAudio}
              >
                {isLoadingAudio ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause size={22} />
                ) : (
                  <Play size={22} />
                )}
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-transparent text-colorTitle hover:bg-bgGray font-medium min-w-0 w-8 h-8 flex-col leading-[50%] items-center justify-center pb-1"
                onPress={skipForward}
                isDisabled={!meetingDocument?.url_recording || isLoadingAudio}
              >
                <Redo size={16} />
                10
              </Button>
            </div>
            <div className="flex items-center justify-end gap-1">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-9 h-9 flex-col leading-[50%] items-center justify-center"
                onPress={toggleMute}
                isDisabled={!meetingDocument?.url_recording}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
              <div className="w-16 flex">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 var(--bgGray) rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
                      (isMuted ? 0 : volume) * 100
                    }%, var(--bgGray) ${
                      (isMuted ? 0 : volume) * 100
                    }%, var(--bgGray) 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockFiles;
