import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllEmployees,
  getTopEmployees,
  getAverageSalary,
} from "../services/employee.service";

const EmployeesComponent = () => {
  const [employee, setEmployee] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [averageSalary, setAverageSalary] = useState([]);

  //get all empoyees
  useEffect(() => {
    getAllEmployees()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setEmployee]);

  //get 5 employees who completed the largest number of tasks in past month
  useEffect(() => {
    getTopEmployees()
      .then((response) => {
        setTopEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setTopEmployees]);

  //statistc about average salary
  useEffect(() => {
    getAverageSalary()
      .then((response) => {
        console.log(response.data);
        setAverageSalary(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setAverageSalary]);

  //render all empolyees
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
            <Link
              to={`/employee/edit/${employee._id}`}
              className="linkReset edit"
            >
              Edit employee
            </Link>
            <button>Delete employee</button>
          </div>
        </div>
      );
    });
  };

  //render top 5 employees
  const renderTopEmpolyees = () => {
    return topEmployees.map((employee, index) => {
      return (
        <div className="topEmployees" key={index}>
          <Link
            to={`/employee/${employee._id}`}
            className="linkReset employeeLink"
          >
            Full Name : {employee.fullName}
          </Link>
        </div>
      );
    });
  };

  //render average salary statistc

  const renderAverageSalary = () => {
    return averageSalary.map((salary, index) => {
      return (
        <div className="averageSalary" key={index}>
          <h3>${salary.averageSalary}</h3>
        </div>
      );
    });
  };
  return (
    <div className="empolyeeWrapper">
      <Link to="/addEmployee" className="linkReset addEmployee">
        Add employee
      </Link>
      <div className="infoContainer">
        <div className="topEmpoyees">
          <h2>Top employees</h2>
          {renderTopEmpolyees()}
        </div>
        <div className="employees">
          <h2>All employees</h2>
          {renderEmployees()}
        </div>
        <div className="averageSalaryWrapper">
          <h2>Average salary</h2>
          {renderAverageSalary()}
        </div>
      </div>
    </div>
  );
};

export default EmployeesComponent;
