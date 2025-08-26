import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { Button, Tooltip } from "@heroui/react";
import { Info, Mic, Square, Trash, UsersRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface WidgetRecordingProps {
  onRecordingStart?: () => void;
  onRecordingStop?: (audioUrl?: string) => void;
  onRecordingDelete?: () => void;
}

const WidgetRecording: React.FC<WidgetRecordingProps> = ({
  onRecordingStart,
  onRecordingStop,
  onRecordingDelete,
}) => {
  const { openDrawer } = useDrawerContext();
  const { openModal } = useModalContext();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const requestMicPermission = async (): Promise<MediaStream> => {
    return await navigator.mediaDevices.getUserMedia({ audio: true });
  };

  const handleStartRecording = async () => {
    if (isRecording) return;
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
        // Passer l'URL au container immédiatement
        onRecordingStop && onRecordingStop(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      onRecordingStart && onRecordingStart();
    } catch (err) {
      console.error("Erreur accès micro:", err);
    }
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
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    onRecordingDelete && onRecordingDelete();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex justify-center items-center lg:gap-5">
        <Tooltip
          content={"Participants"}
          classNames={{
            content: ["bg-colorTitle border-0 text-white text-xs"],
          }}
        >
          <Button
            className="w-[50px] h-[50px] min-w-0 p-0 rounded-full bg-bgGray text-colorTitle"
            onPress={() => openDrawer("DraweParticipantRoom")}
          >
            <UsersRound size={22} />
          </Button>
        </Tooltip>
        <div className="content-btns-action p-2 items-center flex gap-2 bg-bgGray rounded-full">
          <Tooltip
            content={"Arrêter"}
            classNames={{
              content: ["bg-colorTitle border-0 text-white text-xs"],
            }}
          >
            <Button
              className="w-[50px] h-[50px] min-w-0 p-0 rounded-full bg-bgCard text-colorTitle"
              onPress={() => {
                handleStopRecording();
                openModal("ModalStep");
              }}
            >
              <Square size={22} />
            </Button>
          </Tooltip>

          <Tooltip
            content={isRecording ? "En cours..." : "Démarrer"}
            classNames={{
              content: ["bg-colorTitle border-0 text-white text-xs"],
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
              content: ["bg-colorTitle border-0 text-white text-xs"],
            }}
          >
            <Button
              className="w-[50px] h-[50px] min-w-0 p-0 rounded-full bg-bgCard text-colorTitle"
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
            content: ["bg-colorTitle border-0 text-white text-xs"],
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
  );
};

export default WidgetRecording;
