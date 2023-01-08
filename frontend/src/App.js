import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "./utils/context/UserContextProvider";
import GlobalStyle from "./theme/GlobalStyles";
import Header from "./components/Header";
import { setAuthToken } from "./utils/helpers/auth-helpers";

function App() {
  const { user, setUser } = useUserContext();
  useEffect(() => {
    setUser({ email: "ivan@ivan.com", token: "eyeioajeofaweoifawe", role: 1 });
    setAuthToken("ergijaoergoipaergjpea");
  }, [setUser]);

  console.log("user", user);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
