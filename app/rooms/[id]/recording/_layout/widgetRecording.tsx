import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { useLoading } from "@/contexts/Overlay/LoadingContext";
import { useStartMeeting } from "@/hooks/features/meetings/hook.start-meeting";
import { Button, Tooltip } from "@heroui/react";
import {
  Info,
  Mic,
  Square,
  Trash,
  UsersRound,
  Play,
  Pause,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface WidgetRecordingProps {
  onRecordingStart?: () => void;
  onRecordingStop?: (audioUrl?: string) => void;
  onRecordingDelete?: () => void;
  id: string;
}

const WidgetRecording: React.FC<WidgetRecordingProps> = ({
  onRecordingStart,
  onRecordingStop,
  onRecordingDelete,
  id,
}) => {
  const { openDrawer } = useDrawerContext();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { startLoading, stopLoading } = useLoading();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [, setCurrentTime] = useState<number>(0);
  const [, setDuration] = useState<number>(0);
  const { mutate: startMeeting } = useStartMeeting({
    onSuccessCallback: async () => {
      stopLoading();
      setIsRecording(true);

      try {
        const stream = await requestMicPermission();
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e: BlobEvent) => {
          if (e.data && e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(blob);
          console.log("Audio recorded, URL created:", url);
          setAudioUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return url;
          });
          // Initialiser l'audio pour la lecture
          initializeAudio(url);
          // Passer l'URL au container immédiatement
          if (onRecordingStop) {
            onRecordingStop(url);
          }
          stream.getTracks().forEach((t) => t.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        if (onRecordingStart) {
          onRecordingStart();
        }
      } catch (err) {
        console.error("Erreur accès micro:", err);
      }
    },
  });

  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Fonction pour formater le temps en mm:ss
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Fonction pour initialiser l'audio
  const initializeAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(url);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
  };

  // Fonction pour jouer/pause l'audio
  const togglePlayPause = async () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Erreur lors de la lecture:", error);
      }
    }
  };

  // Fonction pour changer la position dans l'audio
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const requestMicPermission = async (): Promise<MediaStream> => {
    return await navigator.mediaDevices.getUserMedia({ audio: true });
  };

  const handleStartRecording = async () => {
    if (isRecording) return;
    startLoading();
    startMeeting({ id_meeting: id });
  };

  const handleStopRecording = () => {
    if (!isRecording) return;
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  const handleDeleteRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (onRecordingDelete) {
      onRecordingDelete();
    }
  };

  return (
    <>
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Lecteur audio - affiché seulement si un audio est disponible */}

        {/* Contrôles d'enregistrement */}
        <div className="flex justify-center items-center lg:gap-5">
          <Tooltip
            content={"Participants"}
            classNames={{
              content: [
                "bg-black/70 backdrop-blur-sm border-0 text-white text-xs",
              ],
            }}
          >
            <Button
              className="w-[50px] h-[50px] min-w-0 p-0 rounded-full bg-bgGray text-colorTitle"
              onPress={() => openDrawer("DraweParticipantRoom")}
            >
              <UsersRound size={22} />
            </Button>
          </Tooltip>
          <div className="content-btns-action p-2 items-center flex gap-2 bg-bgGray  rounded-full">
            <Tooltip
              content={"Arrêter"}
              classNames={{
                content: [
                  "bg-black/70 backdrop-blur-sm border-0 text-white text-xs",
                ],
              }}
            >
              <Button
                className="w-[50px] h-[50px] min-w-0 p-0 rounded-full bg-bgCard dark:bg-bgGray text-colorTitle"
                onPress={() => {
                  handleStopRecording();
                }}
              >
                <Square size={22} />
              </Button>
            </Tooltip>

            <Tooltip
              content={isRecording ? "En cours..." : "Démarrer"}
              classNames={{
                content: [
                  "bg-black/70 backdrop-blur-sm border-0 text-white text-xs",
                ],
              }}
            >
              <Button
                className={`w-[60px] h-[60px] min-w-0 p-0 rounded-full ${
                  isRecording ? "bg-[#ff7a7a]" : "bg-[#ff4949]"
                } text-white`}
                onPress={handleStartRecording}
                isDisabled={isRecording}
              >
                <Mic size={26} />
              </Button>
            </Tooltip>

            <Tooltip
              content={"Supprimer"}
              classNames={{
                content: [
                  "bg-black/70 backdrop-blur-sm border-0 text-white text-xs",
                ],
              }}
            >
              <Button
                className="w-[50px] h-[50px] min-w-0 p-0 rounded-full bg-bgCard dark:bg-bgGray  text-colorTitle"
                onPress={handleDeleteRecording}
                isDisabled={!audioUrl && !isRecording}
              >
                <Trash size={22} />
              </Button>
            </Tooltip>
          </div>
          <Tooltip
            content={"Infos générales"}
            classNames={{
              content: [
                "bg-black/70 backdrop-blur-sm border-0 text-white text-xs",
              ],
            }}
          >
            <Button
              className="w-[50px] h-[50px] min-w-0 p-0 rounded-full bg-bgGray text-colorTitle"
              onPress={() => openDrawer("DrawerInfoRoom")}
            >
              <Info size={22} />
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default WidgetRecording;
