import React from "react";
import { Typography } from "@material-ui/core";

//styles
import { HeaderImage, HeaderWrapper } from "../styles/Header.styled";
import { useUserContext } from "../utils/context/UserContextProvider";

const Header = () => {
  const { user } = useUserContext();

  return (
    <HeaderWrapper>
      <Typography color="primary">{user && user.email}</Typography>
      <HeaderImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/1200px-Closed_Book_Icon.svg.png" />
    </HeaderWrapper>
  );
};

export default Header;
