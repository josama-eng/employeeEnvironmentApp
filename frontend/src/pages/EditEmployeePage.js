import { useParams, useNavigate } from "react-router-dom";
import { getEmployee, updateEmployee } from "../services/employee.service";
import { getAllTasks } from "../services/tasks.service";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { getAllDepartments } from "../services/department.service";
import * as Yup from "yup";
import { toast } from "react-toastify";
import SelectInput from "../components/SelectInput";

const initEmployee = {
  fullName: "",
  email: "",
  phoneNumber: "",
  monthlySalary: "",
  tasks: [],
  department: "",
};
const EditEmployeePage = () => {
  const { id } = useParams();
  const [editEmployee, setEditEmployee] = useState(null);
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

  useEffect(() => {
    if (id) {
      getEditEmployee(id);
    }
  }, [id]);

  const getEditEmployee = (employeeId) => {
    getEmployee(employeeId)
      .then((response) => {
        const employeeData = response.data[0];
        const departmentId = employeeData.department._id;
        employeeData.department = departmentId;
        const tasksArray = employeeData.tasks.map((task) => task._id);
        employeeData.tasks = tasksArray;
        setEditEmployee(employeeData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdateEmployee = (values) => {
    updateEmployee({ ...values, id })
      .then((response) => {})
      .catch((error) => {
        toast.error("Something went wrong,please try latter");
        console.log(error);
      });
  };
  const renderForm = () => {
    return (
      <Formik
        initialValues={editEmployee || initEmployee}
        onSubmit={(values) => {
          onUpdateEmployee(values);
          navigate("/employees");
          toast.success("Employee updated");
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
        enableReinitialize={true}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <div>
              <label htmlFor="fullName">Name:</label>
              <Field type="text" id="name" name="fullName" />
              {props.errors.fullName && (
                <div id="feedback">{props.errors.fullName}</div>
              )}
            </div>
            <div>
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <Field type="date" id="dateOfBirth" name="dateOfBirth" />
              <ErrorMessage name="dateOfBirth" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label htmlFor="monthlySalary">Salary:</label>
              <Field type="number" id="monthlySalary" name="monthlySalary" />
              <ErrorMessage name="salary" />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <Field type="tel" id="phoneNumber" name="phoneNumber" />
              <ErrorMessage name="phoneNumber" />
            </div>
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
            <div>
              <label>Tasks</label>
              <FieldArray name="tasks">
                {({ insert, remove, push }) => (
                  <div>
                    {props.values.tasks?.length > 0 &&
                      props.values.tasks?.map((task, index) => (
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
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    );
  };
  return (
    <div className="editEmployee">
      <h2>Edit Employee</h2>
      {renderForm()}
    </div>
  );
};

export default EditEmployeePage;
