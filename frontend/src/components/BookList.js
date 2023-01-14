import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Link from "@material-ui/core/Link";
import { getAllBooks, borrowBook, returnBook } from "../utils/api/axios.js";
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
  link: {
    color: "#4c4a37",
    fontFamily: "'Source Sans Pro',sans-serif",
    fontSize: "18px",
    lineHeight: "32px",
  },
}));

export default function SearchableBookList(props) {
  const { books } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const classes = useStyles();
  const [allBooks, setAllBooks] = useState([]);
  const { user } = useUserContext();

  console.log(user);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const fetchData = async () => {
    const data = await getAllBooks(user.id);
    setAllBooks(data.data);
  };
  useEffect(() => {
    fetchData().catch(console.error);
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
                .filter(
                  (key) =>
                    key !== "name" && key !== "id" && key !== "currentlyLoaned"
                )
                .map((key) => `${book[key]}`)
                .join(" | ")}
            />
            {book.currentlyLoaned ? (
              <Link href={`viewer/${book.id}`} variant="body2">
                View
              </Link>
            ) : (
              <IconButton
                aria-label="borrow"
                onClick={() => {
                  borrowBook(book.id, user.id).then(() => fetchData());
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
