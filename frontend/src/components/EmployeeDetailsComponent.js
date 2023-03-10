import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmployee } from "../services/employee.service";
import { formatDate } from "../utils/formatDate";

const EmployeeDetailsComponent = () => {
  const { id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState([]);
  useEffect(() => {
    getEmployee(id)
      .then((response) => {
        setEmployeeDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const renderEmployeeDetails = () => {
    return employeeDetails.map((employee, index) => {
      return (
        <div className="employeeDetails" key={index}>
          <h2>Name: {employee.fullName}</h2>
          <h3>Email: {employee.email}</h3>
          <h3>Monthly Salary: ${employee.monthlySalary}</h3>
          <h3>Date od birth: {formatDate(employee.dateOfBirth)}</h3>
          <h3>Phone number: {employee.phoneNumber}</h3>
        </div>
      );
    });
  };
  return <div>{renderEmployeeDetails()}</div>;
};

export default EmployeeDetailsComponent;
