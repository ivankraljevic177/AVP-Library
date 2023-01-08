import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import sample from "../PDF/muha.pdf";
import Link from "@material-ui/core/Link";
import { getAllBooks,borrowBook } from "../utils/api/axios.js";
import { useUserContext } from "../utils/context/UserContextProvider";


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

export default function SearchableBookList(props) {
  const { books } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const classes = useStyles();
  const [allBooks, setAllBooks] = useState([]);
  const {user} = useUserContext();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBooks();
      setAllBooks(data.data);
    }
    fetchData().catch(console.error);;
  }, []);

  useEffect(() => {
    const filteredBooks = allBooks.filter((book) =>
      Object.values(book).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setDisplayedBooks(filteredBooks);
  }, [searchTerm, allBooks]);
  
  // add i remove ikonice prikazat i sakrit po potrebi
  return (
    <div>
      <TextField
        label="Search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className={classes.center}
      />
      <List className={classes.root}>
        {displayedBooks.map((book) => (
          <ListItem key={book.id}>
            <ListItemText
              primary={book.name}
              secondary={Object.keys(book)
                .filter((key) => key !== "title")
                .map((key) => `${book[key]}`)
                .join(" | ")}
            />
 <Link href="viewer" variant="body2" className={classes.link}>View</Link>
            <IconButton
              aria-label="borrow"
              onClick={() =>borrowBook(book.id,user.id)}
            >
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton
              aria-label="return"
              onClick={() => console.log("return")}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
