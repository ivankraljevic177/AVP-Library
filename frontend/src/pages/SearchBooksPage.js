import React from "react";
import BookList from "../components/BookList";
import Header from "../components/Header";
import { Container } from "../styles/Container.styled";
import { books } from "../data";

export default function SearchBooksPage() {
  return (
    <>
      <Header />
      <Container>
        <BookList books={books} />
      </Container>
      ;
    </>
  );
}
