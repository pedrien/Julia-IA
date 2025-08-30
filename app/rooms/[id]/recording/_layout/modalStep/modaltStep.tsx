import { useModalContext } from "@/contexts/Modal/ModalContext";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Progress,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGenerateTranscription } from "@/hooks/features/meetings/hook.generate-transcription";
import { useGenerateRapport } from "@/hooks/features/meetings/hook.generate-rapport";
import { useRouter } from "next/navigation";

interface ModalStepProps {
  recordedAudio?: string | null;
  audioFile?: File | null;
  meetingId?: string;
}

const ModalStep: React.FC<ModalStepProps> = ({
  recordedAudio,
  meetingId,
  audioFile,
}) => {
  const { isModalOpen, closeModal } = useModalContext();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [audioFileState, setAudioFileState] = useState<File | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    mutate: generateTranscription,
    isPending: isGeneratingTranscription,
  } = useGenerateTranscription({
    onSuccessCallback: () => {
      if (currentStep === 1) {
        setCurrentStep(2);
      }
    },
  });

  const { mutate: generateRapport, isPending: isGeneratingRapport } =
    useGenerateRapport({
      onSuccessCallback: () => {
        if (currentStep === 2) {
          setCurrentStep(3);
        }
      },
    });

  // Debug: Log quand l'audio change
  useEffect(() => {
    console.log("ModalStep - recordedAudio:", recordedAudio);
  }, [recordedAudio]);

  // Forcer le chargement des métadonnées audio
  useEffect(() => {
    if (audioRef.current && recordedAudio) {
      audioRef.current.load();
    }
  }, [recordedAudio]);

  // Convertir l'URL audio en fichier
  useEffect(() => {
    if (recordedAudio) {
      fetch(recordedAudio)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], "recording.webm", {
            type: "audio/webm",
          });
          setAudioFileState(file);
          console.log("Audio file created:", file);
        })
        .catch((error) => {
          console.error("Error converting audio to file:", error);
        });
    }
  }, [recordedAudio]);

  const handleSubmitRecording = () => {
    if (!meetingId || !audioFileState) {
      console.error("Missing meetingId or audioFile");
      return;
    }

    console.log("Submitting recording:", { meetingId, audioFile });
  };

  const handleGenerateTranscription = () => {
    if (!meetingId) {
      console.error("Missing meetingId");
      return;
    }

    console.log("Generating transcription for meeting:", meetingId);
    generateTranscription({ id: meetingId });
  };

  const handleGenerateRapport = () => {
    if (!meetingId) {
      console.error("Missing meetingId");
      return;
    }

    console.log("Generating rapport for meeting:", meetingId);
    generateRapport({ id: meetingId });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      zIndex: 0,
      x: direction === "right" ? -300 : 300,
      opacity: 0,
    }),
  };

  const getStepData = (step: number) => {
    switch (step) {
      case 1:
        return {
          image: "/images/transcribe.png",
          title: "Transcription",
          description:
            "Conversion de votre enregistrement audio en texte transcrit pour faciliter l'analyse et la compréhension du contenu de la réunion.",
          stepNumber: 1,
          progressBars: [true, false, false],
          hasAudioPlayer: true,
        };
      case 2:
        return {
          image: "/images/resume.png",
          title: "Génération du compte rendu",
          description:
            "Création automatique d'un résumé structuré et détaillé de votre réunion avec les points clés, décisions et actions à retenir.",
          stepNumber: 2,
          progressBars: [true, true, false],
          hasAudioPlayer: false,
        };
      case 3:
        return {
          image: "/images/send.png",
          title: "Transfert du compte rendu",
          description:
            "Envoi automatique du compte rendu généré aux participants de la réunion par email pour un suivi optimal des décisions prises.",
          stepNumber: 3,
          progressBars: [true, true, true],
          hasAudioPlayer: false,
        };
      default:
        return {
          image: "/images/transcribe.png",
          title: "Transcription",
          description:
            "Conversion de votre enregistrement audio en texte transcrit pour faciliter l'analyse et la compréhension du contenu de la réunion.",
          stepNumber: 1,
          progressBars: [true, false, false],
          hasAudioPlayer: true,
        };
    }
  };

  return (
    <Modal
      size="md"
      isOpen={isModalOpen("ModalStep")}
      onClose={() => closeModal("ModalStep")}
      isDismissable={false}
      hideCloseButton={true}
    >
      <ModalContent className="bg-linear-to-b from-[#ece2fd] to-white">
        {() => (
          <>
            <ModalBody>
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentStep}
                    custom="right"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="w-full"
                  >
                    <div className="col-span-1">
                      <div className="flex justify-center mt-5">
                        <div className="flex justify-center items-center lg:w-[150px] lg:h-[150px] rounded-full bg-lightPrimaryColor">
                          <Image
                            src={getStepData(currentStep).image}
                            className="lg:w-[70%!important] h-[70%!important] object-contain"
                            alt={`image étape ${currentStep}`}
                            width={0}
                            height={0}
                            layout="responsive"
                          />
                        </div>
                      </div>
                      <div className="step text-center text-xs text-colorMuted mt-3 mb-2">
                        Etape {getStepData(currentStep).stepNumber}
                      </div>
                      <div className="content-bar-step flex justify-center gap-2 mb-5">
                        {getStepData(currentStep).progressBars.map(
                          (isActive, index) => (
                            <div
                              key={index}
                              className={`bar w-10 h-2 rounded-full ${
                                isActive ? "bg-primaryColor" : "bg-bgGray"
                              }`}
                            ></div>
                          )
                        )}
                      </div>
                      <div className="text-center">
                        <h2 className="text-colorTitle font-medium lg:text-[20px]">
                          {getStepData(currentStep).title}
                        </h2>
                        <p className="text-sm text-colorMuted px-8">
                          {getStepData(currentStep).description}
                        </p>

                        {/* Mini lecteur audio pour le step 1 */}
                        {getStepData(currentStep).hasAudioPlayer && (
                          <div className="mt-6">
                            <div className="border-dashed border-2 border-colorBorder rounded-2xl p-3">
                              {recordedAudio ? (
                                <div>
                                  <p className="text-xs text-colorMuted mb-2">
                                    Audio enregistrée disponible
                                  </p>
                                  {/* Audio element caché pour contrôler la lecture */}
                                  <audio
                                    ref={audioRef}
                                    src={recordedAudio}
                                    onLoadedMetadata={(e) => {
                                      const target =
                                        e.target as HTMLAudioElement;
                                      console.log(
                                        "Audio loaded, duration:",
                                        target.duration
                                      );
                                      if (
                                        isFinite(target.duration) &&
                                        target.duration > 0
                                      ) {
                                        setDuration(target.duration);
                                      } else {
                                        setDuration(0);
                                      }
                                    }}
                                    onCanPlay={(e) => {
                                      const target =
                                        e.target as HTMLAudioElement;
                                      console.log(
                                        "Audio can play, duration:",
                                        target.duration
                                      );
                                      if (
                                        isFinite(target.duration) &&
                                        target.duration > 0
                                      ) {
                                        setDuration(target.duration);
                                      }
                                    }}
                                    onTimeUpdate={(e) => {
                                      const target =
                                        e.target as HTMLAudioElement;
                                      setCurrentTime(target.currentTime);
                                      if (
                                        isFinite(target.duration) &&
                                        target.duration > 0
                                      ) {
                                        setProgress(
                                          (target.currentTime /
                                            target.duration) *
                                            100
                                        );
                                      } else {
                                        setProgress(0);
                                      }
                                    }}
                                    onPlay={() => {
                                      console.log("Audio playing");
                                      setIsPlaying(true);
                                    }}
                                    onPause={() => {
                                      console.log("Audio paused");
                                      setIsPlaying(false);
                                    }}
                                    onEnded={() => {
                                      setIsPlaying(false);
                                      setProgress(0);
                                      setCurrentTime(0);
                                    }}
                                    onError={(e) => {
                                      console.error("Audio error:", e);
                                    }}
                                  />
                                  {/* Mini lecteur personnalisé */}
                                  <div className="flex items-center gap-3">
                                    <Button
                                      isIconOnly
                                      size="sm"
                                      variant="flat"
                                      className="bg-primaryColor text-white min-w-0 w-8 h-8"
                                      onPress={handlePlayPause}
                                    >
                                      {isPlaying ? (
                                        <Pause size={16} />
                                      ) : (
                                        <Play size={16} />
                                      )}
                                    </Button>
                                    <div className="flex-1">
                                      <Progress
                                        value={progress}
                                        className="w-full"
                                        size="sm"
                                        classNames={{
                                          indicator: "bg-primaryColor",
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-between text-xs text-colorTitle mt-2">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>
                                      {isFinite(duration)
                                        ? formatTime(duration)
                                        : "00:00"}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-xs text-colorMuted mb-2">
                                    Aucun audio enregistré
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <Button
                                      isIconOnly
                                      size="sm"
                                      variant="flat"
                                      className="bg-primaryColor text-white min-w-0 w-8 h-8"
                                      disabled
                                    >
                                      <Play size={16} />
                                    </Button>
                                    <div className="flex-1">
                                      <Progress
                                        value={0}
                                        className="w-full"
                                        size="sm"
                                        classNames={{
                                          indicator: "bg-primaryColor",
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-between text-xs text-colorTitle mt-2">
                                    <span>00:00</span>
                                    <span>00:00</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex items-center gap-3 w-full mt-1">
                <Button
                  className="w-1/2 bg-bgGray h-auto py-3 text-colorTitle"
                  onPress={() => closeModal("ModalStep")}
                >
                  Annuler
                </Button>
                {currentStep === 1 ? (
                  <Button
                    className="w-1/2 h-auto py-3 bg-primaryColor text-white"
                    onPress={handleGenerateTranscription}
                    isLoading={isGeneratingTranscription}
                    isDisabled={!meetingId}
                  >
                    {isGeneratingTranscription
                      ? "Génération..."
                      : "Générer la Transcription"}
                  </Button>
                ) : currentStep === 2 ? (
                  <Button
                    className="w-1/2 h-auto py-3 bg-primaryColor text-white"
                    onPress={handleGenerateRapport}
                    isLoading={isGeneratingRapport}
                    isDisabled={!meetingId}
                  >
                    {isGeneratingRapport
                      ? "Génération..."
                      : "Générer le Rapport"}
                  </Button>
                ) : (
                  <Button className="w-1/2 h-auto py-3 bg-primaryColor text-white">
                    Transférer
                  </Button>
                )}
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalStep;
