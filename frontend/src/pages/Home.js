import React from "react";
import { Button } from "@material-ui/core";
import { getAllBooks } from "../utils/api/axios";

export const Home = () => {
  const handleClick = async () => {
    await getAllBooks();
  };

  return (
    <div>
      Home
      <Button onClick={handleClick}>submit</Button>
    </div>
  );
};
