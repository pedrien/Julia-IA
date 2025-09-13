"use client";

import { Button, Tooltip, Spinner } from "@heroui/react";
import { Copy, RefreshCcw, Download } from "lucide-react";
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

  // Fonction pour générer et télécharger le PDF
  const handleDownloadPdf = async () => {
    if (!transcription?.text) return;

    try {
      // Créer un HTML pour le PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Transcription de Réunion</title>
          <style>
            @page {
              margin: 2cm;
              size: A4;
            }
            body {
              font-family: 'Helvetica', Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 20px;
              color: #333;
              font-size: 12px;
            }
            .header {
              border-bottom: 2px solid #007bff;
              padding-bottom: 15px;
              margin-bottom: 25px;
            }
            .title {
              font-size: 20px;
              font-weight: bold;
              color: #007bff;
              margin: 0 0 5px 0;
            }
            .date {
              font-size: 11px;
              color: #666;
              margin: 0;
            }
            .content {
              font-size: 11px;
              white-space: pre-wrap;
              margin-bottom: 20px;
              line-height: 1.5;
            }
            .footer {
              font-size: 9px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 15px;
              margin-top: 30px;
              font-style: italic;
              text-align: center;
            }
            @media print {
              body { 
                margin: 0; 
                padding: 15px;
              }
              .header { 
                page-break-after: avoid; 
              }
              .content {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">Transcription de Réunion</h1>
            <div class="date">Généré le: ${new Date().toLocaleDateString(
              "fr-FR"
            )}</div>
          </div>
          
          <div class="content">${transcription.text.replace(
            /\n/g,
            "<br>"
          )}</div>
          
          <div class="footer">
            Document généré automatiquement - ${
              transcription.text.length
            } caractères
          </div>
        </body>
        </html>
      `;

      // Créer un iframe caché pour la génération PDF
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      // Écrire le contenu dans l'iframe
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();

        // Attendre que le contenu soit chargé
        iframe.onload = () => {
          setTimeout(() => {
            try {
              // Utiliser l'API d'impression pour générer le PDF directement
              iframe.contentWindow?.print();

              // Nettoyer après impression
              setTimeout(() => {
                document.body.removeChild(iframe);
              }, 2000);
            } catch (error) {
              console.error("Erreur lors de l'impression:", error);
              document.body.removeChild(iframe);

              // Fallback: télécharger comme HTML
              const blob = new Blob([htmlContent], { type: "text/html" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `transcription-reunion-${id}-${
                new Date().toISOString().split("T")[0]
              }.html`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }
          }, 100);
        };
      } else {
        document.body.removeChild(iframe);
        throw new Error("Impossible de créer l'iframe");
      }
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      // Fallback: télécharger comme fichier texte
      const blob = new Blob([transcription.text], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `transcription-reunion-${id}-${
        new Date().toISOString().split("T")[0]
      }.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
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
        <Spinner
          classNames={{
            circle1: "border-b-primaryColor",
            circle2: "border-b-primaryColor",
          }}
        />
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
        <h3 className="text-colorTitle font-semibold">Transcription</h3>
        <div className="flex items-center gap-1">
          <Tooltip
            content={copied ? "Copié !" : "Copier le texte"}
            classNames={{
              content: [
                "bg-black/70 backdrop-blur-sm border-0 text-white text-xs",
              ],
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

          <Tooltip
            content="Télécharger en PDF"
            classNames={{
              content: [
                "bg-black/70 backdrop-blur-sm border-0 text-white text-xs",
              ],
            }}
          >
            <Button
              className="bg-transparent border border-colorBorder text-colorTitle text-xs p-0 min-w-0 h-[26px] w-[26px] hover:border-primaryColor hover:text-primaryColor"
              onPress={handleDownloadPdf}
              isDisabled={!transcription.text}
            >
              <Download size={14}></Download>
            </Button>
          </Tooltip>
        </div>
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
