import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  getAllBooks,
  borrowBook,
  returnBook,
  getAllLoanedBooks,
  getBookById,
  getBookLoanCounts,
} from "../utils/api/axios.js";

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

export default function MostLoaned(props) {
  //loaned books table
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const classes = useStyles();
  const [allBookLoans, setAllBookLoans] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBookLoanCounts();
      setAllBookLoans(data.data);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      Loan count:
      <List className={classes.root}>
        {allBookLoans.map((book) => (
          <ListItem key={book.id}>
            <ListItemText primary={book.name} secondary={book.loanCount} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
