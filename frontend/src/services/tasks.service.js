import axios from "axios";

export const getAllTasks = () => axios.get("/task/all");
export const deleteTask = (id) => axios.delete(`/task/${id}`);
export const getTask = (id) => axios.get(`/task/${id}`);
export const addTask = (payload) => axios.post("/task", payload);
