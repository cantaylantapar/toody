import { Component } from "react";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./services/taskServices";

export class Tasks extends Component {
  state = { tasks: [], currentTask: {} };

  async componentDidMount() {
    try {
      const { data } = await getTasks();
      this.setState({ tasks: data });
    } catch (error) {
      console.log(error);
    }
  }
  handleChange = ({ currentTarget: input }) => {
    this.setState({ currentTask: input.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // const originalTasks = this.state.tasks
    try {
      const { data } = await addTask({ message: this.state.currentTask });
      // const newTasks = [data, ...originalTasks]
      // this.setState({tasks: newTasks, currentTask: ""})
      this.setState((prevState) => ({
        tasks: [[data, ...prevState.tasks]],
        currentTask: "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdate = async (currentTask) => {
    try {
      const index = this.state.tasks.findIndex(
        (task) => task._id === currentTask._id
      );
      this.setState((prevState) => ({
        tasks: prevState.tasks.map((task) =>
          task._id === currentTask._id
            ? { ...task, completed: !prevState.completed }
            : task
        ),
      }));
      await updateTask(currentTask._id, {
        completed: this.state.tasks[index].completed,
      });
    } catch (error) {
      return this.state;
    }
  };

  handleDelete = async (currentTask) => {
    try {
      this.setState((prevState) => ({
        tasks: prevState.tasks.filter((task) => task._id !== currentTask._id),
      }));
      await deleteTask(currentTask._id);
    } catch (error) {
      return this.state;
    }
  };
}

export default Tasks;
