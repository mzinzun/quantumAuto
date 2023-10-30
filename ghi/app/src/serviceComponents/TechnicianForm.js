import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TechnicianForm() {
  // State variables to manage form input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate(); // Access the navigation function from React Router
  
  // Event handler functions to update state on input changes
  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const handleEmployeeIdChange = (event) => {
    const value = event.target.value;
    setEmployeeId(value);
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent to the server
    const data = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId
    };

    // Define the URL for creating a new technician
    const techUrl = `http://localhost:8080/api/technicians/`;

    // Configuration for the HTTP request
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Send the technician data to the server
    const response = await fetch(techUrl, fetchConfig);
    if (response.ok) {
      // If the response is successful, log the new technician and navigate to the technicians page
      const newTechnician = await response.json();
      console.log(newTechnician);
      navigate("/technicians");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="">Create a Technician</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="firstName"
                required
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="lastName"
                required
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={employeeId}
                onChange={handleEmployeeIdChange}
                placeholder="employeeId"
                required
                type="text"
                name="employeeId"
                id="employeeId"
                className="form-control"
              />
              <label htmlFor="employeeId">Employee ID</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TechnicianForm;
