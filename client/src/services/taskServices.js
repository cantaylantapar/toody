import axios from "axios";
const tasksAPI = "http://localhost:8080/api/tasks";

export const getTasks = (user) => axios.get(`${tasksAPI}/${user.username}`);

export const addTask = (task) => axios.post(tasksAPI, task);

export const updateTask = (id, task) => axios.put(`${tasksAPI}/${id}`, task);

export const deleteTask = (id) => axios.delete(`${tasksAPI}/${id}`);
