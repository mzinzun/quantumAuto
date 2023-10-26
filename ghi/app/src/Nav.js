import { NavLink, Link } from 'react-router-dom';
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
        <Dropdown.Item as={NavLink} to="/technicians" className="nav-link " aria-current="page"> 
                Technicians List
        </Dropdown.Item> 
        <Dropdown.Item as={NavLink} to="/technicians/new" className="nav-link " aria-current="page"> 
                Create Technician
        </Dropdown.Item> 
        <Dropdown.Item as={NavLink} to="/appointments" className="nav-link " aria-current="page">
                Appointments
        </Dropdown.Item>
        <Dropdown.Item as={NavLink} to="/appointments/new" className="nav-link " aria-current="page">
                Create Appointment
        </Dropdown.Item>
        <Dropdown.Item as={NavLink} to="/appointments/all" className="nav-link " aria-current="page">
                Appointment History
        </Dropdown.Item>
        </DropdownButton>

        <DropdownButton id="dropdown-basic-button ml-5" title="Inventory">
          <Dropdown.Item as={NavLink} to="/manufacturers/new" className="nav-link " aria-current="page">
                Create Manufacturer
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/manufacturers" className="nav-link " aria-current="page">
                Manufacturer List
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/models" className="nav-link " aria-current="page">
                Model List
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/models/new" className="nav-link " aria-current="page">
                Model Form
          </Dropdown.Item>
        </DropdownButton>
      
        </div>
      </div>
    </nav>
  )
}

export default Nav;
