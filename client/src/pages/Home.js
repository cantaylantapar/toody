import React, { useContext, Suspense } from "react";
import { useState, useEffect } from "react";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/taskServices";
import { Context } from "../context/Context";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(Context);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTasks(user);
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setText(input.value);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addTask({ message: text, user: user.username });
      setTasks([...tasks, data]);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (currentTask) => {
    try {
      const index = tasks.findIndex((task) => task._id === currentTask._id);
      const newTasks = tasks.map((task) =>
        task._id === currentTask._id
          ? { ...task, completed: !task.completed }
          : task
      );
      setTasks(newTasks);
      await updateTask(currentTask._id, newTasks[index]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (currentTask) => {
    try {
      const newTasks = tasks.filter((task) => task._id !== currentTask._id);
      setTasks(newTasks);
      await deleteTask(currentTask._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Suspense fallback="loading">
      <div className="page-content page-container" id="page-content">
        <div className="">
          <div className="container justify-content-center py-4">
            <div className="col-md-12">
              <div className="card px-2">
                <div className="card-body">
                  <h5 className="card-title">{t("my-toodies")}</h5>
                  <form className="add-items d-flex" onSubmit={handleAdd}>
                    <div className="input-group my-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("what-do-you-need-to-do-today")}
                        aria-describedby="button-addon"
                        value={text}
                        required={true}
                        onChange={handleChange}
                      />
                      <button
                        className="add btn btn-outline-secondary"
                        id="button-addon"
                        type="submit"
                      >
                        {t("add")}
                      </button>
                    </div>
                  </form>
                  <ul className="list-group my-2">
                    {tasks.map((task) => (
                      <li
                        key={task._id}
                        className={`list-group-item d-flex justify-content-between border-0 border-bottom ${
                          task.completed ? "completed" : ""
                        }`}
                      >
                        <div>
                          <input
                            className="form-check-input me-1 border border-success border-2"
                            type="checkbox"
                            value=""
                            aria-label="..."
                            checked={task.completed}
                            onChange={() => handleUpdate(task)}
                          />
                          <span
                            className={`p-2 fs-6`}
                            style={{
                              textDecoration: `${
                                task.completed ? "line-through" : ""
                              } red`,
                            }}
                          >
                            {task.message}
                          </span>
                        </div>
                        <button
                          className="btn-close "
                          onClick={() => handleDelete(task)}
                        ></button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
