import React from "react";
import Header from "../components/Header";
import { Container } from "../styles/Container.styled";
import Login from "../components/Login";
import { useUserContext } from "../utils/context/UserContextProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  if (user) {
    return navigate("/");
  }

  return (
    <>
      <Container>
        <a href="/admin/dashboard">AdminDashboardPage</a>
        <a href="/user/search">SearchBooksPage</a>
        <a href="/register">Register</a>
      </Container>
      <Login></Login>
    </>
  );
}
