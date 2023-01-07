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
export const loginUser = (newUser) => API.post("/login", newUser);
// export const verifyUser = () => API.get('/auth/user');

// export const getAllStudents = () => API.get('auth/students');
