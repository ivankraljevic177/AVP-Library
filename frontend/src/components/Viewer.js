import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import sample from "../PDF/muha2.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

export default function Viewer(props) {
  const [file, setFile] = useState(sample);
  const [numPages, setNumPages] = useState(null);
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__document">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                scale={96 / 72}
                renderMode="svg"
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              ></Page>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
