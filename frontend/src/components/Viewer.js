import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import sample from "../PDF/muha2.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../styles/Viewer.css";




const useStyles = makeStyles((theme) => ({
  
  center: {
    display: "flex",

  },
  
}));

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl:'standard_fonts/',
  };

export default function Viewer(props) {
const [file, setFile] = useState(sample);
const [numPages, setNumPages] = useState(null);
  

  
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }
  
  return (
    <div className="Example">
    <div className="Example__container">
      <div className="Example__container__document">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page scale={96/72} renderMode="svg" key={`page_${index + 1}`} pageNumber={index + 1}></Page>
          ))}
        </Document>

      </div>
    </div>
  </div>
  );
}
