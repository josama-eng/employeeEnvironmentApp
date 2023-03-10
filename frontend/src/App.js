import { Outlet } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavComponent from "./components/NavComponent";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NavComponent />
      <Outlet />
    </div>
  );
}

export default App;
