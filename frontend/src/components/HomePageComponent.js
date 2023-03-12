import { useState, useEffect } from "react";
import { getAllTasks, deleteTask } from "../services/tasks.service";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HomePageComponent = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getAllTasks(tasks)
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setTasks]);

  const handleDeleteTask = (id) => {
    deleteTask(id)
      .then((response) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        toast.success("Successfully delteted");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  const renderTasks = () => {
    return tasks.map((task, index) => {
      return (
        <div className="task" key={index}>
          <h2>Task title : {task.title}</h2>
          <p>
            <Link
              to={`/employee/${task.assignee?._id ?? ""}`}
              className="linkReset employeeLink"
            >
              Assignee : {task.assignee?.fullName ?? ""}
            </Link>
          </p>
          {/* <h3>Due Date: {formatDate(task.dueDate)}</h3> */}
          <div className="actions">
            <Link to={`/task/${task._id}`} className="linkReset taskLink">
              See details
            </Link>
            <button onClick={() => handleDeleteTask(`${task._id}`)}>
              Delete
            </button>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <Link to="/addTask" className="linkReset addTask">
        Add task
      </Link>
      <div className="tasks">
        <h2>Tasks</h2>
        <div className="taskContainer">{renderTasks()}</div>
      </div>
    </>
  );
};

export default HomePageComponent;
