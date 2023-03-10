import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEmployees } from "../services/employee.service";

const EmployeesComponent = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    getAllEmployees()
      .then((response) => {
        console.log(response.data);
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setEmployee]);

  const renderEmployees = () => {
    return employee.map((employee, index) => {
      return (
        <div className="employee" key={index}>
          <Link
            to={`/employee/${employee._id}`}
            className="linkReset employeeLink"
          >
            Full Name : {employee.fullName}
          </Link>
          <div className="actions">
            <Link to={`/employee/edit/${employee._id}`} className="linkReset">
              Edit employee
            </Link>
            <button>Delete employee</button>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <Link to="/addEmployee" className="linkReset employeeLink">
        Add employee
      </Link>
      {renderEmployees()}
    </div>
  );
};

export default EmployeesComponent;
