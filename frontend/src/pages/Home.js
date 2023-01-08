import React from "react";
import { Button } from "@material-ui/core";
import { getAllBooks } from "../utils/api/axios";
import SearchBooksPage from "./SearchBooksPage";

export const Home = () => {
  const handleClick = async () => {
    await getAllBooks();
  };

  return (
    <div>
      <SearchBooksPage />
    </div>
  );
};
