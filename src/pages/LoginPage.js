import React from "react";
import Header from "../components/Header";
import { Container } from "../styles/Container.styled";

export default function LoginPage() {
  return (
    <>
      <Header />
      <Container>
        Login page
        <a href="/register">RegisterPage</a>
        <a href="/admin/dashboard">AdminDashboardPage</a>
        <a href="/user/search">SearchBooksPage</a>
      </Container>
      ;
    </>
  );
}
