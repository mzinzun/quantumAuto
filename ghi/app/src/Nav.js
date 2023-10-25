import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <DropdownButton id="dropdown-basic-button" title="Services">
      
      <Dropdown.Item> 
        <NavLink
                className="nav-link active"
                aria-current="page"
                to="/technicians"
              >
                Technicians List
        </NavLink>
        </Dropdown.Item> 
        <Dropdown.Item> 
        <NavLink
                className="nav-link active"
                aria-current="page"
                to="/technicians/new"
              >
                Create Technician
        </NavLink>
        </Dropdown.Item> 
        <Dropdown.Item>
        <NavLink
                className="nav-link active"
                aria-current="page"
                to="/appointments"
              >
                Appointments
              </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
        <NavLink
                className="nav-link active"
                aria-current="page"
                to="/appointments/new"
              >
                Create Appointment
              </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
        <NavLink
                className="nav-link "
                aria-current="page"
                to="/appointments/all"
              >
                Appointment History
              </NavLink>
        </Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button ml-5" title="Inventory">
        <Dropdown.Item>
          <NavLink
                className="nav-link "
                aria-current="page"
                to="/manufacturers/new"
              >
                Create Manufacturer
              </NavLink>
          </Dropdown.Item>
          <Dropdown.Item>
          <NavLink
                className="nav-link "
                aria-current="page"
                to="/manufacturers"
              >
                Manufacturer List
              </NavLink>
          </Dropdown.Item>
          <Dropdown.Item>
          <NavLink
                className="nav-link "
                aria-current="page"
                to="/models"
              >
               Models List
              </NavLink>
          </Dropdown.Item>
         
        </DropdownButton>
      
        </div>
      </div>
    </nav>
  )
}

export default Nav;
