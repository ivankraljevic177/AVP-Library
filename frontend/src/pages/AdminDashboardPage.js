import React from "react";
import Header from "../components/Header";
import { Container } from "../styles/Container.styled";
import UserList from "../components/UserList";
import { users } from "../data";
import AddBookForm from "../components/AddBook";
import LateList from "../components/LateList";
import MostLoaned from "../components/MostLoaned";

export default function AdminDashboardPage() {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        gap: "4rem",
        padding: "4rem",
        justifyContent: "center",
      }}
    >
      <AddBookForm />
      <MostLoaned />
      <UserList users={users} />
      <LateList />
    </div>
  );
}
