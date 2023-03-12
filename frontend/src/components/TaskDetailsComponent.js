import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTask } from "../services/tasks.service";
import { formatDate } from "../utils/formatDate";

const TaskDetailsComponent = () => {
  const { id } = useParams();
  const [taskDetails, setTaskDetails] = useState([]);
  useEffect(() => {
    getTask(id)
      .then((response) => {
        setTaskDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const renderTaskDetails = () => {
    return taskDetails.map((task, index) => {
      return (
        <div className="taksDetails" key={index}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <h3>Due Date: {formatDate(task.dueDate)}</h3>
          <div className="actions">
            <Link
              to={`/employee/${task.assignee?._id ?? ""}`}
              className="linkReset employeeLink"
            >
              Assignee : {task.assignee?.fullName ?? ""}
            </Link>
            <Link to={`/edit/task/${task._id}`} className="linkReset editLink">
              Edit task
            </Link>
          </div>
        </div>
      );
    });
  };
  return <div>{renderTaskDetails()}</div>;
};

export default TaskDetailsComponent;
