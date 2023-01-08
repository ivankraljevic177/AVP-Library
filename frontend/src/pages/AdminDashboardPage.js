import React from "react";
import Header from "../components/Header";
import { Container } from "../styles/Container.styled";
import UserList from "../components/UserList";
import { users } from "../data";
import AddBookForm from "../components/AddBook";

export default function AdminDashboardPage() {
  return (
    <>
    <AddBookForm/>
      <Container>Admin dashboard page
      <UserList users={users} /></Container>;
    </>
  );
}
