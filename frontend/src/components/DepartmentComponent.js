import { getAllDepartments } from "../services/department.service";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setDepartments]);

  const renderDepartments = () => {
    return departments.map((department, index) => {
      return (
        <div className="department" key={index}>
          <h2>Department name: {department.departmentName}</h2>
          <p>Employees:</p>
          {department.employees.map((employee, index) => {
            return (
              <Link
                to={`/employee/${employee._id}`}
                className="linkReset employeeLink"
                key={index}
              >
                {employee.fullName}
              </Link>
            );
          })}
        </div>
      );
    });
  };
  return <div className="departments">{renderDepartments()}</div>;
};

export default DepartmentComponent;
