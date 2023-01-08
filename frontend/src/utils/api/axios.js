import axios from "axios";
import { getAuthToken } from "../helpers/auth-helpers";

const API = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Authorization: `Bearer ${getAuthToken}`,
  },
});

// export const fetchSubjects = () => API.get('/subjects');
// export const createSubject = newSubject => API.post('/subjects', newSubject);
// export const updateSubject = (newSubject, id) => API.post(`/subjects/${id}`, newSubject);

// export const createUser = newUser => API.post('/users', newUser);
export const loginUser = (email,password) => API.post("/login", {email:email,password:password});
export const registerUser = (name,email,password) => API.post("/register", {name:name,email:email,password:password});
export const getAllBooks = () => API.get("/books");
export const getAllUsers = () => API.get("/users");
export const borrowBook = (bookId, userId) => API.post("/borrow-book", {bookId, userId});
export const returnBook = (bookId, userId) => API.post("/return-book", {bookId, userId});
export const verifyUser = () => API.get('/verify');
// export const verifyUser = () => API.get('/auth/user');

// export const getAllStudents = () => API.get('auth/students');