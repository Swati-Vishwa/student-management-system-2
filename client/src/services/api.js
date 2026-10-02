import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/students",
})

export const getStudents = () => API.get('/');
export const getStudent = (id) => API.get(`/${id}`);
export const addStudent = (student) => API.post('/', student);
export const updateStudent = (id, student) => API.put(`/${id}`, student);
export const deleteStudent = (id) => API.delete(`/${id}`)

export const getErrorMessage = (err) => 
  err.response?.data?.message || "Cannot reach the server. Is the backend running?";
console.log(API)