import React, { useState } from 'react';
import '../styles/Login.css';
import { createUser, addBook } from '../utils/api/axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/helpers/auth-helpers";
import { useUserContext } from "../utils/context/UserContextProvider";

function AddBookForm() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [ISBN, setISBN] = useState('');
  const [format, setFormat] = useState('');
  const [genre, setGenre] = useState('');
  const [publisher, setPublisher] = useState('');
  const [copies, setCopies] = useState('');

  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  
  const handleSubmit = async (event) => {
    event.preventDefault();
      const response = await addBook({ name, author, ISBN, format, genre, publisher, copies });
      console.log(response)
  };

  return (
    <div className='login-form'>

    <form onSubmit={handleSubmit}>
    <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={event => setAuthor(event.target.value)}
        />
      </label>
      <label>
        ISBN:
        <input
          type="text"
          value={ISBN}
          onChange={event => setISBN(event.target.value)}
        />
      </label>
      <label>
        Format:
        <input
          type="text"
          value={format}
          onChange={event => setFormat(event.target.value)}
        />
      </label>
      <label>
        Genre:
        <input
          type="text"
          value={genre}
          onChange={event => setGenre(event.target.value)}
        />
      </label>
      <label>
        Publisher:
        <input
          type="text"
          value={publisher}
          onChange={event => setPublisher(event.target.value)}
        />
      </label>
      <label>
        Copies:
        <input
          type="text"
          value={copies}
          onChange={event => setCopies(event.target.value)}
        />
      </label>     
      <button type="submit">Add Book</button>
    </form>

    </div>
  );
}

export default AddBookForm;