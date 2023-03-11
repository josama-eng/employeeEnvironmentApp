import axios from "axios";

export const getAllEmployees = () => axios.get("/employee/all");
export const getEmployee = (id) => axios.get(`/employee/${id}`);
export const getTopEmployees = () => axios.get("/employee/topFive");
export const getAverageSalary = () => axios.get("/employee/averageSalary");
export const addEmployee = (payload) => axios.post("/employee", payload);
export const updateEmployee = (payload, id) =>
  axios.put(`/employee/edit/${id}`, payload);
export const deleteEmployee = (id) => axios.delete(`/employee/${id}`);
