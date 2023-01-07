import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import GlobalStyle from "./theme/GlobalStyles";
import { createBrowserHistory } from "history";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import SearchBooksPage from "./pages/SearchBooksPage";
import ViewerPage from "./pages/ViewerPage";

function App() {
  const history = createBrowserHistory({ basename: "/" });
  return (
    <>
      <GlobalStyle />
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
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
          <Route path="/user/viewer">
            <ViewerPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
