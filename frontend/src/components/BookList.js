import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

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
}));

export default function SearchableBookList(props) {
  const { books } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedBooks, setDisplayedBooks] = useState(books);
  const classes = useStyles();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filteredBooks = books.filter((book) =>
      Object.values(book).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setDisplayedBooks(filteredBooks);
  }, [searchTerm, books]);

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
              primary={book.title}
              secondary={Object.keys(book)
                .filter((key) => key !== "title")
                .map((key) => `${book[key]}`)
                .join(" | ")}
            />
            <IconButton
              aria-label="borrow"
              onClick={() => console.log("borrow")}
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
