import React from "react";
import Header from "../components/Header";
import { Container } from "../styles/Container.styled";
import UserList from "../components/UserList";
import { users } from "../data";
import AddBookForm from "../components/AddBook";
import LateList from "../components/LateList";

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
      <UserList users={users} />
      <LateList />
    </div>
  );
}
