import React from "react";
import BookList from "../components/BookList";
import { Container } from "../styles/Container.styled";
import { books } from "../data";

export default function SearchBooksPage() {
  return (
    <>
      <Container>
        <BookList books={books} />
      </Container>
      ;
    </>
  );
}
