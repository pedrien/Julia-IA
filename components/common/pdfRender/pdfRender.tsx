"use client";
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./styles/styles.css";
import { Input } from "@heroui/react";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfRenderProps {
  readonly file: File | string;
}

export default function PdfRender({ file }: PdfRenderProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState(window.innerWidth * 0.8);
  const [currentPage, setCurrentPage] = useState<number>(1); // État pour la page actuelle
  const [inputValue, setInputValue] = useState<string>("1"); // État pour la valeur de l'Input
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]); // Références pour chaque page

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth * 0.8;
      setPageWidth(newWidth > 800 ? 800 : newWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set the correct width
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    pageRefs.current = new Array(numPages).fill(null); // Initialise les références des pages
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
  // #f3f2f5
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setInputValue(currentPage.toString()); // Synchronise l'Input avec la page actuelle
  }, [currentPage]);

  return (
    <div className="pdf-container h-full relative lg:pb-[50px]">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <div
            key={`page_${index + 1}`}
            className="pdf-page"
            ref={(el) => {
              pageRefs.current[index] = el; // Associe chaque page à une référence
            }}
          >
            <Page pageNumber={index + 1} width={pageWidth} />
          </div>
        ))}
      </Document>
      <div className="block-nav-page sticky  w-[150px] z-50 mt-2 bottom-2 shadow-md bg-bgCard p-2 rounded-full">
        <div className="content-nav flex justify-center items-center gap-3">
          <p className="text-sm text-colorMuted">Page</p>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              id="nom"
              labelPlacement="outside"
              variant="bordered"
              value={inputValue} // Utilise la valeur temporaire de l'Input
              onChange={handleInputChange} // Met à jour la valeur de l'Input
              onKeyDown={handlePageJump} // Déclenche le défilement lors de l'appui sur "Entrée"
              classNames={{
                inputWrapper:
                  "bg-bgFond h-[24px] px-1 min-h-0 py-0 w-[40px] border-[0px] shadow-none rounded-md",
                input:
                  "text-colorTitle, placeholder:text-colorMuted, text-center",
              }}
            />
            <span className="text-sm">/</span>
            <span className="text-sm  text-colorMuted">{numPages || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
