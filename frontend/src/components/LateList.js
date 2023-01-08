import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getAllBooks, borrowBook , returnBook, getAllLoanedBooks, getBookById} from "../utils/api/axios.js";

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
  link: {
    color: "#4c4a37",
    fontFamily: "'Source Sans Pro',sans-serif",
    fontSize: "18px",
    lineHeight: "32px",
  },
}));

export default function SearchableBookList(props) {

  //loaned books table  
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const classes = useStyles();
  const [allBooks, setAllBooks] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllLoanedBooks();
      setAllBooks(data.data);
    };
    fetchData().catch(console.error);
  }, []);

  //Stvori datum koji je 14 dana prije danasnjeg
  const today = new Date()
  const timestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate()-14)

  useEffect(() => {    
    const filteredBooks = allBooks.filter((book) =>    
      
    //usporedi da li je manji od datuma prije 14 dana
        Date.parse(book.dateStart) < timestamp       
    
    );
    setDisplayedBooks(filteredBooks);
  }, [searchTerm, allBooks]);  

  return (
    <div>      
        Late loans:
      <List className={classes.root}>
        {displayedBooks.map((book) => (
          <ListItem key={book.bookId}>
            <ListItemText
              primary={book.bookId}
              secondary={Object.keys(book)
                .filter((key) => key !== "title")
                .map((key) => `${book[key]}`)
                .join(" | ")}
            />        
          </ListItem>
        ))}
      </List>
    </div>
  );
}
