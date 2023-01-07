import React from "react";
import Header from "../components/Header";
import { Container } from "../styles/Container.styled";
import Login from "../components/Login";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  center: {
    display: "flex",
    "justify-content": "center",
  },
  link:{
    color: "#4c4a37",
    fontFamily: "'Source Sans Pro',sans-serif",
    fontSize: "18px",
    lineHeight: "32px",

  }
}));



export default function LoginPage() {

  const classes = useStyles();
  

  return (
    <>
    <Header />
      <Container>        
        <Link href="/admin/dashboard" className={classes.link} >Admin Dashboard </Link>
        <Link href="/user/search" className={classes.link}>Search Books</Link>
        <Link href="/register" className={classes.link}>Register</Link>
      </Container>
      <Login>
      </Login>   
      
    </>
  );
}
