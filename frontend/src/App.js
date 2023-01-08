import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "./utils/context/UserContextProvider";
import GlobalStyle from "./theme/GlobalStyles";
import Header from "./components/Header";
import { getAuthToken, setAuthToken } from "./utils/helpers/auth-helpers";
import { verifyUser } from "./utils/api/axios";

function App() {
  const { user, setUser } = useUserContext();


  useEffect(() => {

    console.log(getAuthToken())

    const getData = async () => {
      const response = await verifyUser();

      setUser(response.data)

      console.log(response)
    }

    getData()

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
