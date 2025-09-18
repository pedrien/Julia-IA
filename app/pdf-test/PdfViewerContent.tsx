"use client";

import PdfView from "@/components/common/PdfView/PdfView";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewerContent({
  pdfArrayBuffer,
}: {
  pdfArrayBuffer: ArrayBuffer;
}) {
  return (
    <div>
      {/* <Document file={pdfArrayBuffer} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p> */}
      <PdfView arrayBuffer={pdfArrayBuffer} />
    </div>
  );
}
