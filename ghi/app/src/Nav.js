import { NavLink, Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <ul className="nav nav-tabs">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Inventory</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Sales</a>
            <ul className="dropdown-menu">
              <li><Link to = '/customers' className="dropdown-item" >Customers</Link></li>
              <li><Link to = '/createCustomer' className="dropdown-item" >Create Customers</Link></li>
              <li><Link to = '/salespeople' className="dropdown-item" >Sales People</Link></li>
              <li><Link to = '/creatSalesPerson' className="dropdown-item" >Create Sales Person</Link></li>
              <li><Link to = '/sales' className="dropdown-item" >Sales</Link></li>
              <li><Link to = '/createSales' className="dropdown-item" >Record Sale</Link></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Services</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>
          </ul>

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
