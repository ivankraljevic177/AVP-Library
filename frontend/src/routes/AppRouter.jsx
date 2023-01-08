import React from "react";
import App from "../App";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "../pages/RegisterPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import { useUserContext } from "../utils/context/UserContextProvider";
import Login from "../components/Login";
import { Home } from "../pages/Home";

const AppRouter = () => {
  const { user } = useUserContext();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                user && user.role === 1 ? (
                  <AdminDashboardPage />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
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
    </div>
  );
};

export default AppRouter;
