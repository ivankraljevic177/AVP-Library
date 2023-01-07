import React from "react";
import App from "../App";
import Home from "../pages/Home";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "../pages/RegisterPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import LoginPage from "../pages/LoginPage";
import { UserContextProvider } from "../utils/context/UserContextProvider";
import Login from "../components/Login";

const AppRouter = () => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    // setUser({ name: "Ivan", email: "ivan@gmail.com", jwt: "aerfaorevooew" });
  }, [setUser]);

  return (
    <div>
      <UserContextProvider initialUser={user}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
};

export default AppRouter;
