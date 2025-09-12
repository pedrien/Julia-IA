"use client";

import { Button, Tooltip, Spinner } from "@heroui/react";
import { Copy, RefreshCcw } from "lucide-react";
import React, { useState } from "react";
import { useGetMeetingTranscription } from "@/hooks/features/meetings/hook.get-meeting-transcription";

const TabsTranscriptionText = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);
  const {
    data: transcription,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useGetMeetingTranscription(id);

  // Fonction pour copier le texte dans le presse-papiers
  const handleCopyText = async () => {
    if (transcription?.text) {
      try {
        await navigator.clipboard.writeText(transcription.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset après 2 secondes
      } catch (error) {
        console.error("Erreur lors de la copie:", error);
      }
    }
  };

  // Fonction pour formater le texte de transcription
  const formatTranscriptionText = (text: string) => {
    return text.split("\n").map((line, index) => {
      // Détecter les noms d'intervenants (lignes qui se terminent par :)
      if (line.trim().endsWith(":")) {
        return (
          <div
            key={index}
            className="font-semibold text-primaryColor mb-1 mt-3 first:mt-0"
          >
            {line}
          </div>
        );
      }
      // Détecter les paragraphes vides
      if (line.trim() === "") {
        return <div key={index} className="h-2" />;
      }
      // Texte normal
      return (
        <div
          key={index}
          className="text-colorTitle text-sm leading-relaxed mb-2"
        >
          {line}
        </div>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Spinner />
      </div>
    );
  }

  if (isError || !transcription) {
    return (
      <div className="flex items-center flex-col justify-center gap-5 h-[300px]">
        <span className="text-colorTitle text-center">
          Une erreur est survenue lors de la récupération de la transcription
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
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-3 mt-2">
        <h3 className="text-colorTitle font-semibold">
          Transcription ({transcription.text.length} caractères)
        </h3>
        <Tooltip
          content={copied ? "Copié !" : "Copier le texte"}
          classNames={{
            content: ["bg-black/70 backdrop-blur-sm border-0 text-white text-xs"],
          }}
        >
          <Button
            className={`bg-transparent border border-colorBorder text-colorTitle text-xs p-0 min-w-0 h-[26px] w-[26px] ${
              copied ? "border-green-500 text-green-500" : ""
            }`}
            onPress={handleCopyText}
            isDisabled={!transcription.text}
          >
            <Copy size={14}></Copy>
          </Button>
        </Tooltip>
      </div>

      <div className="bg-bgGray rounded-lg p-4 ">
        {transcription.text ? (
          <div className="whitespace-pre-wrap">
            {formatTranscriptionText(transcription.text)}
          </div>
        ) : (
          <div className="text-center py-8">
            <span className="text-colorMuted text-sm">
              Aucune transcription disponible
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsTranscriptionText;
