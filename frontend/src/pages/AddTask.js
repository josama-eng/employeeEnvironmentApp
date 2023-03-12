import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTask } from "../services/tasks.service";
import { getAllEmployees } from "../services/employee.service";
import SelectInput from "../components/SelectInput";

const initTask = {
  title: "",
  description: "",
  assignee: "",
  dueDate: "",
};

const AddTask = () => {
  const [assignee, setAssignee] = useState([]);
  useEffect(() => {
    getAllEmployees()
      .then((response) => {
        setAssignee(
          response.data.map((assignee) => ({
            label: assignee.fullName,
            value: assignee._id,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setAssignee]);
  const onAddTask = (values) => {
    addTask({ ...values })
      .then((response) => {})
      .catch((error) => {
        toast.error("Something went wrong,please try latter");
        console.log(error);
      });
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={initTask}
        onSubmit={(values) => {
          onAddTask(values);
        }}
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
                  options={assignee}
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
    <div className="addTaskWrapper">
      <h2>Add task</h2>
      {renderForm()}
    </div>
  );
};

export default AddTask;
