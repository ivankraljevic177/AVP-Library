import React, { useState, useEffect } from "react";
import Viewer from "../components/Viewer";
import { useParams } from "react-router-dom";

export default function ViewerPage() {
  let { id } = useParams();

  return (
    <>
      <Viewer file={{ url: `http://localhost:4000/books/${id}` }} />
    </>
  );
}
