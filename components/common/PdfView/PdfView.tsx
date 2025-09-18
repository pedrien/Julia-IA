"use client";

import { Button, Input, Spinner } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./styles/styles.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewProps {
  arrayBuffer: ArrayBuffer;
}

function PdfView({ arrayBuffer }: PdfViewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState(800);
  const [pageHeight] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // État pour la page actuelle
  const [inputValue, setInputValue] = useState<string>("1"); // État pour la valeur de l'Input
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]); // Références pour chaque page
  const containerRef = useRef<HTMLDivElement>(null); // Référence pour le conteneur parent

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Prendre 90% de la largeur du conteneur, avec un minimum de 300px et maximum de 800px
        const newWidth = Math.min(800, Math.max(300, containerWidth * 0.9));
        setPageWidth(newWidth);
      }
    };

    // Initial call to set the correct width
    handleResize();

    // Utiliser ResizeObserver pour détecter les changements de taille du conteneur
    let resizeObserver: ResizeObserver | null = null;

    if (containerRef.current && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(containerRef.current);
    }

    // Fallback avec window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
    pageRefs.current = new Array(numPages).fill(null); // Initialise les références des pages
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Erreur lors du chargement du PDF:", error);

    // Gestion spécifique des erreurs CORS
    if (
      error.message.includes("CORS") ||
      error.message.includes("Access-Control-Allow-Origin")
    ) {
      setError(
        "Erreur CORS: Impossible de charger le PDF depuis le serveur distant. Veuillez contacter l'administrateur pour configurer les en-têtes CORS appropriés."
      );
    } else if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("net::ERR_FAILED")
    ) {
      setError(
        "Impossible de récupérer le fichier PDF. Vérifiez votre connexion réseau et que le serveur est accessible."
      );
    } else {
      setError(
        "Impossible de charger le PDF. Veuillez vérifier que le fichier est valide et accessible."
      );
    }

    setIsLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Met à jour la valeur de l'Input
  };

  const handlePageJump = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const page = parseInt(inputValue, 10);
      if (!isNaN(page) && page >= 1 && page <= (numPages || 1)) {
        setCurrentPage(page); // Met à jour la page actuelle
        pageRefs.current[page - 1]?.scrollIntoView({ behavior: "smooth" }); // Fait défiler jusqu'à la page spécifiée
      } else {
        // Réinitialise l'input à la page actuelle si la saisie est invalide
        setInputValue(currentPage.toString());
      }
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      pageRefs.current[newPage - 1]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToNextPage = () => {
    if (currentPage < (numPages || 1)) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      pageRefs.current[newPage - 1]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (pageRefs.current.length > 0) {
      for (let i = 0; i < pageRefs.current.length; i++) {
        const pageRef = pageRefs.current[i];
        if (pageRef) {
          const rect = pageRef.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setCurrentPage(i + 1); // Met à jour la page actuelle
            break;
          }
        }
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setInputValue(currentPage.toString()); // Synchronise l'Input avec la page actuelle
  }, [currentPage]);

  // Affichage du chargement
  if (isLoading) {
    return (
      <div className="pdf-container h-full relative flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" color="primary" />
          <p className="text-colorMuted">Chargement du PDF...</p>
        </div>
      </div>
    );
  }

  // Affichage de l'erreur
  if (error) {
    const handleDownloadPDF = () => {
      try {
        const blob = new Blob([arrayBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "document.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    };

    const handleRetry = () => {
      setError(null);
      setIsLoading(true);
      // Reset states for retry
      setNumPages(null);
      setCurrentPage(1);
      setInputValue("1");
    };

    return (
      <div className="pdf-container h-full relative flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center p-6 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-colorTitle mb-2">
              Erreur de chargement
            </h3>
            <p className="text-colorMuted text-sm mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              <Button
                size="sm"
                variant="flat"
                className="bg-primaryColor text-white"
                onPress={handleRetry}
              >
                Réessayer
              </Button>
              <Button size="sm" variant="bordered" onPress={handleDownloadPDF}>
                Télécharger
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="pdf-container h-full relative lg:pb-[50px]"
    >
      <Document
        file={arrayBuffer}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <div className="flex items-center justify-center h-64">
            <Spinner size="lg" color="primary" />
          </div>
        }
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div
            key={`page_${index + 1}`}
            className="pdf-page"
            ref={(el) => {
              pageRefs.current[index] = el; // Associe chaque page à une référence
            }}
            style={{
              maxHeight: pageHeight ? `${pageHeight}px` : "none",
              overflow: "hidden",
              margin: "0 auto 20px auto",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
            }}
          >
            <Page
              pageNumber={index + 1}
              width={pageWidth}
              height={pageHeight || undefined}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </div>
        ))}
      </Document>
      {numPages && numPages > 0 && (
        <div className="block-nav-page sticky w-auto z-50 mt-4 bottom-4 shadow-lg bg-bgCard dark:bg-bgGray p-2 rounded-2xl left-1/2 transform -translate-x-1/2">
          <div className="content-nav flex justify-center items-center gap-4">
            <Button
              isIconOnly
              size="md"
              variant="flat"
              className="bg-transparent text-colorTitle hover:bg-bgGray dark:hover:bg-bgCard min-w-0 w-10 h-10 rounded-full"
              onPress={goToPreviousPage}
              isDisabled={currentPage <= 1}
            >
              <ChevronLeft size={20} />
            </Button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-colorMuted">Page</span>
              <Input
                type="text"
                id="page-input"
                labelPlacement="outside"
                variant="bordered"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handlePageJump}
                classNames={{
                  inputWrapper:
                    "bg-bgFond h-[32px] px-3 min-h-0 py-0 w-[50px] border border-gray-300 shadow-none rounded-lg",
                  input: "text-colorTitle text-center font-medium text-sm",
                }}
              />
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-colorMuted">/</span>
                <span className="text-xs font-medium text-colorMuted">
                  {numPages}
                </span>
              </div>
            </div>

            <Button
              isIconOnly
              size="md"
              variant="flat"
              className="bg-transparent text-colorTitle hover:bg-bgGray dark:hover:bg-bgCard  min-w-0 w-10 h-10 rounded-full"
              onPress={goToNextPage}
              isDisabled={currentPage >= numPages}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfView;
