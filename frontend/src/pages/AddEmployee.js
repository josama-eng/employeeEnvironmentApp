import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addEmployee } from "../services/employee.service";
import { getAllDepartments } from "../services/department.service";
import { getAllTasks } from "../services/tasks.service";
import SelectInput from "../components/SelectInput";

const initEmployee = {
  fullName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  monthlySalary: 0,
  tasks: [],
  department: "",
};

const AddEmployee = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllDepartments()
      .then((response) => {
        setDepartments(
          response.data.map((department) => ({
            label: department.departmentName,
            value: department._id,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setDepartments]);

  useEffect(() => {
    getAllTasks(tasks)
      .then((response) => {
        setTasks(
          response.data.map((task) => ({ label: task.title, value: task._id }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setTasks]);

  const onAddEmployee = (values) => {
    addEmployee({
      ...values,
    })
      .then((response) => {})
      .catch((error) => {
        toast.error("Something went wrong,please try latter");
        console.log(error);
      });
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={initEmployee}
        onSubmit={(values, actions) => {
          onAddEmployee(values);
          navigate("/employees");
          toast.success("Employee added");
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().required("Full name is required"),
          email: Yup.string().email().required("Email is required"),
          dateOfBirth: Yup.date().required("Date of birth is required"),
          phoneNumber: Yup.number()
            .typeError("That doesn't look like a phone number")
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(8)
            .required("Phone number is required"),
          monthlySalary: Yup.number()
            .positive("A salary can't start with a minus")
            .required("Required field"),
          tasks: Yup.array().required("Required"),
          department: Yup.string().required("Department is required"),
        })}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <div>
              <label htmlFor="fullName">Full Name</label>
              <Field id="fullName" name="fullName" />
              {props.errors.fullName && (
                <div id="feedback">{props.errors.fullName}</div>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field id="email" type="email" name="email" />
              {props.errors.email && (
                <div id="feedback">{props.errors.email}</div>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone number</label>
              <Field id="phoneNumber" name="phoneNumber" />
              {props.errors.phoneNumber && (
                <div id="feedback">{props.errors.phoneNumber}</div>
              )}
            </div>
            <div>
              <label htmlFor="dateOfBirth">Date of birth</label>
              <Field id="dateOfBirth" type="date" name="dateOfBirth" />
              {props.errors.dateOfBirth && (
                <div id="feedback">{props.errors.dateOfBirth}</div>
              )}
            </div>
            <div>
              <label htmlFor="monthlySalary">Monthly salary</label>
              <Field id="monthlySalary" type="number" name="monthlySalary" />
              {props.errors.monthlySalary && (
                <div id="feedback">{props.errors.monthlySalary}</div>
              )}
            </div>
            ​
            <div>
              <label>Tasks</label>
              <FieldArray name="tasks">
                {({ insert, remove, push }) => (
                  <div>
                    {props.values.tasks.length > 0 &&
                      props.values.tasks.map((task, index) => (
                        <div key={index}>
                          <div>
                            <Field
                              component={SelectInput}
                              options={tasks}
                              name={`tasks.${index}`}
                            />
                          </div>
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => push({ value: "", label: "" })}
                    >
                      Add Task
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            ​
            <div>
              <label htmlFor="department">Department</label>
              <div>
                <Field
                  component={SelectInput}
                  options={departments}
                  name="department"
                />
              </div>
              {props.errors.department && (
                <div id="feedback">{props.errors.department}</div>
              )}
            </div>
            ​<button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <div className="addEmployee">
      <h2>Add employee</h2>
      {renderForm()}
    </div>
  );
};

export default AddEmployee;
