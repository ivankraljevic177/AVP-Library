import React, { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";
import { UserContextProvider } from "./utils/context/UserContextProvider";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import GlobalStyle from "./theme/GlobalStyles";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import SearchBooksPage from "./pages/SearchBooksPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <GlobalStyle />
      {/* <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/admin/dashboard">
              <AdminDashboardPage />
            </Route>
            <Route path="/user/search">
              <SearchBooksPage />
            </Route>
          </Switch>
        </Router> */}
      <Header />
      <Outlet />
    </>
  );
}

export default App;
