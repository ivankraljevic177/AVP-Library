import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routes/AppRouter";
import { UserContextProvider } from "./utils/context/UserContextProvider";

ReactDOM.render(
  <UserContextProvider>
    <AppRouter />
  </UserContextProvider>,

  document.getElementById("root")
);
