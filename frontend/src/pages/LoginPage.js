import React from "react";
import Header from "../components/Header";
import { Container } from "../styles/Container.styled";
import Login from "../components/Login";

export default function LoginPage() {
  return (
    <>
    <Header />
      <Container>        
        <a href="/admin/dashboard">AdminDashboardPage</a>
        <a href="/user/search">SearchBooksPage</a>
        <a href="/register">Register</a>
      </Container>
      <Login>
      </Login>   
      
    </>
  );
}
