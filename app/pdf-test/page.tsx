"use client";

import { useEffect, useState } from "react";
import PdfViewerContent from "./PdfViewerContent";
import { ENV } from "@/env";

export default function PdfTest() {
  const pdfUrl =
    "http://192.168.1.68:8000/storage/reports/zot3wza4AV-20250911_192055.pdf";
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        // Utiliser l'API route pour éviter CORS
        const response = await fetch(
          ENV.NEXT_PUBLIC_API_URL + `pdf?url=${encodeURIComponent(pdfUrl)}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        console.log("PDF fetched successfully via API route:", arrayBuffer);
        setPdfData(arrayBuffer);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdf();
  }, [pdfUrl]);
  return (
    <main className="min-h-screen w-full">
      <div>
        <h1>My PDF Document</h1>
        {pdfData ? (
          <PdfViewerContent pdfArrayBuffer={pdfData} />
        ) : (
          <p>Loading PDF...</p>
        )}
      </div>
    </main>
  );
}
