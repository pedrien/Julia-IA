"use client";
import { Button, Input, Spinner } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./styles/styles.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfRenderProps {
  readonly file: File | string;
}

export default function PdfRender({ file }: PdfRenderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>("1");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let frame: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    let lastWidth = 0;

    const measure = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.getBoundingClientRect().width;
      const newWidth = Math.min(width, 800);

      // Éviter les mises à jour inutiles si la largeur n'a pas vraiment changé
      if (Math.abs(newWidth - lastWidth) > 10) {
        lastWidth = newWidth;
        setContainerWidth(newWidth);
      }
    };

    const debouncedMeasure = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(measure);
      }, 150); // Debounce de 150ms pour plus de stabilité
    };

    const onResize = () => {
      debouncedMeasure();
    };

    window.addEventListener("resize", onResize);
    measure(); // Mesure initiale
    return () => {
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []); // Pas de dépendance pour éviter les boucles

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
    pageRefs.current = new Array(numPages).fill(null); // Initialise les références des pages
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Erreur lors du chargement du PDF:", error);
    setError(
      "Impossible de charger le PDF. Veuillez vérifier que le fichier est valide."
    );
    setIsLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Met à jour la valeur de l'Input
  };

  const handlePageJump = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const page = parseInt(inputValue, 10);
      if (!isNaN(page) && page >= 1 && page <= (numPages || 1)) {
        goToPage(page);
      } else {
        // Réinitialise l'input à la page actuelle si la saisie est invalide
        setInputValue(currentPage.toString());
      }
    }
  };

  const goToPage = (page: number) => {
    if (!pageRefs.current) return;
    const p = Math.max(1, Math.min(page, numPages || 1));
    const el = pageRefs.current[p - 1];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    setCurrentPage(p);
  };

  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

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
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
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
    return (
      <div className="pdf-container h-full relative flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center p-6">
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
            <p className="text-colorMuted">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="pdf-container h-full relative lg:pb-[50px]"
      ref={containerRef}
    >
      <Document
        file={file}
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
              pageRefs.current[index] = el;
            }}
            style={{
              overflow: "hidden",
              margin: "0 auto 20px auto",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
            }}
          >
            <Page
              pageNumber={index + 1}
              width={containerWidth}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </div>
        ))}
      </Document>
      {numPages && numPages > 0 && (
        <div className="block-nav-page sticky w-auto min-w-[240px] z-50 mt-4 bottom-4 shadow-lg bg-bgCard p-2 rounded-2xl left-1/2 transform -translate-x-1/2">
          <div className="content-nav flex items-center gap-4">
            <Button
              isIconOnly
              size="md"
              variant="flat"
              className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-10 h-10 rounded-full"
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
              <div className="text-xs font-medium text-colorMuted flex gap-1">
                <span>/</span><span>{numPages}</span>
              </div>
            </div>

            <Button
              isIconOnly
              size="md"
              variant="flat"
              className="bg-transparent text-colorTitle hover:bg-bgGray min-w-0 w-10 h-10 rounded-full"
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
