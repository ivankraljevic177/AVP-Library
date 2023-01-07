import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Paper from "@material-ui/core/Paper";
import { getAllUsers} from "../utils/api/axios.js";



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



  export default function SearchableUserList(props) {
    const { users } = props;
    const [searchTerm, setSearchTerm] = useState("");
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [category, setCategory] = React.useState('Majmune');
    const classes = useStyles();
    const [allUsers, setAllUsers] = useState([]);
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
    const handleCategoryChange = (event) => {
      setCategory(event.target.value)
    };

    useEffect(() => {
      const fetchData = async () => {
        const data = await getAllUsers();
        setAllUsers(data.data);
      }
      fetchData().catch(console.error);;
    }, []);
  
    useEffect(() => {
      const filteredUsers = allUsers.filter((user) =>
        Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setDisplayedUsers(filteredUsers);
    }, [searchTerm, allUsers]);

    function RentDateFilter(date){
       if(date=="null")
          return "Not rented!";
        else{
          const date1 = new Date(date);
          const date2 = new Date();
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

          if(diffDays<15)
            return "Returned!";
          else
            return "Late!";
         }

        }
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
            {displayedUsers.map((user) => (
              <ListItem key={user.id}>
                <ListItemText
                  primary={user.name}
                  secondary={Object.keys(user)
                    .filter((key) => key !== "name")
                    .map((key) => `${user[key]}`)
                    .join(" | ")}
                />
                <Paper>
                  {RentDateFilter(user.rentdate)}    
                </Paper>
              </ListItem>
            ))}
          </List>
        </div>
      );


  }


