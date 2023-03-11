import axios from "axios";

export const getAllEmployees = () => axios.get("/employee/all");
export const getEmployee = (id) => axios.get(`/employee/${id}`);
export const getTopEmployees = () => axios.get("/employee/topFive");
export const getAverageSalary = () => axios.get("/employee/averageSalary");
