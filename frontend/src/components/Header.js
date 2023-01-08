import React from "react";
import { Button, Typography } from "@material-ui/core";

//styles
import { HeaderImage, HeaderWrapper } from "../styles/Header.styled";
import { useUserContext } from "../utils/context/UserContextProvider";
import { NavLink } from "react-router-dom";
import { removeAuthToken } from "../utils/helpers/auth-helpers";

const Header = () => {
  const { user, setUser } = useUserContext();

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
  };

  return (
    <HeaderWrapper>
      <Typography color="primary">{user && user.email}</Typography>
      {user && user.role === 1 && (
        <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
      )}
      <HeaderImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/1200px-Closed_Book_Icon.svg.png" />
      {user && (
        <Button color="primary" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </HeaderWrapper>
  );
};

export default Header;
