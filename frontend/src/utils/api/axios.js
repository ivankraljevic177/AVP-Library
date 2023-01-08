import axios from "axios";
import { getAuthToken, MyComponent } from "../helpers/auth-helpers";

const API = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3MzIwMzUwOX0.hUlVmKn-EsEOt2HKxdYwX89eod0YFTFYZDkdBMwkE6g`,
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

// export const fetchSubjects = () => API.get('/subjects');
// export const createSubject = newSubject => API.post('/subjects', newSubject);
// export const updateSubject = (newSubject, id) => API.post(`/subjects/${id}`, newSubject);

// export const createUser = newUser => API.post('/users', newUser);
export const loginUser = (newUser) => API.post("/login", newUser);
export const getAllBooks = () => API.get("/books");
export const getAllUsers = () => API.get("/users");
export const borrowBook = (bookId, userId) => API.post("/borrow-book", {bookId, userId});
export const returnBook = (bookId, userId) => API.post("/return-book", {bookId, userId});
export const verifyUser = () => API.get('/verify');

// export const getAllStudents = () => API.get('auth/students');
