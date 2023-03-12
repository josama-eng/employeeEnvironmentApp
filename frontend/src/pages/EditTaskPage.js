import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTask, updateTask } from "../services/tasks.service";
import { getAllEmployees } from "../services/employee.service";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import SelectInput from "../components/SelectInput";

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
  });
  useEffect(() => {
    getAllEmployees()
      .then((response) => {
        setEmployees(
          response.data.map((employee) => ({
            label: employee.fullName,
            value: employee._id,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setEmployees]);

  useEffect(() => {
    id && getEditTask();
  }, [id]);

  const getEditTask = () => {
    getTask(id)
      .then((response) => {
        console.log(response.data);
        setEditTask(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdateTask = (values) => {
    updateTask({ ...values, id })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        toast.error("Something went wrong,please try latter");
        console.log(error);
      });
  };
  const renderForm = () => {
    return (
      <Formik
        initialValues={editTask}
        onSubmit={(values) => {
          onUpdateTask(values);
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          description: Yup.string().required("Description is required"),
          assignee: Yup.string().required("Assignee is required"),
          dueDate: Yup.date().required("Due date is required"),
        })}
        enableReinitialize={true}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <div>
              <label htmlFor="title">Title</label>
              <Field name="title" />
              {props.errors.title && (
                <div id="feedback">{props.errors.title}</div>
              )}
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field as="textarea" name="description" />
              {props.errors.description && (
                <div id="feedback">{props.errors.description}</div>
              )}
            </div>
            <div>
              <label htmlFor="assignee">Assignee</label>
              <div>
                <Field
                  component={SelectInput}
                  options={employees}
                  name="assignee"
                />
              </div>
              {props.errors.assignee && (
                <div id="feedback">{props.errors.assignee}</div>
              )}
            </div>
            <div>
              <label htmlFor="dueDate">Due Date</label>
              <Field id="dueDate" type="date" name="dueDate" />
              {props.errors.dueDate && (
                <div id="feedback">{props.errors.dueDate}</div>
              )}
            </div>
            ​<button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    );
  };
  return (
    <div className="editTaskWrapper">
      <h2>Edit Task</h2>
      {renderForm()}
    </div>
  );
};

export default EditTaskPage;
