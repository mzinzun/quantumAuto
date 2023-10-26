import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ManufacturerForm() {

  const [name, setName] = useState("");
  const navigate = useNavigate()


  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
    name: name,

 }
    const techUrl = `http://localhost:8100/api/manufacturers/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(techUrl, fetchConfig);
    if (response.ok) {
      const newTechnician = await response.json();
      console.log(newTechnician);

       navigate("/manufacturers")
        
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="bg-white">Create a Manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input
                value={name}
                onChange={handleNameChange}
                placeholder="manufacturer"
                required
                type="text"
                name="manufacturer"
                id="manufacturer"
                className="form-control"
              />
              <label htmlFor="manufacturer">Manufacturer</label>
            </div>
            
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerForm;
