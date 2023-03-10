import { Link } from "react-router-dom";

const NavComponent = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="linkReset navLinks">
            Home
          </Link>
        </li>
        <li>
          <Link to="/employees" className="linkReset navLinks">
            Employees
          </Link>
        </li>
        <li>
          <Link to="/departments" className="linkReset navLinks">
            Departments
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavComponent;
