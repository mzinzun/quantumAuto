import React, { useState, useEffect } from "react";

function AppointmentForm() {
  // Here is the old way of creating state hooks for every
  // property. Can you refactor this to make it into a single
  // data object like the ConferenceForm() above?

  const [dateTime, setDateTime] = useState("");
  const [reason, setReason] = useState("");
  const [vin, setVin] = useState("");
  const [customer, setCustomer] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const [technician, setTechnician] = useState("");
  
  
  const handleDateTimeChange = (event) => {
    const value = event.target.value;
    setDateTime(value);
  };

  const handleReasonChange = (event) => {
    const value = event.target.value;
    setReason(value);
  };

  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  };
  const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomer(value);
  };
  const handleTechnicianChange = (event) => {
    const value = event.target.value;
    setTechnician(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
    date_time: dateTime,
    reason: reason,
    vin: vin,
    status: "created",
    customer: customer,
    technician: technician,

    
 }
    const appointmentUrl = `http://localhost:8080/api/appointments/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
      const newAppointment = await response.json();
      console.log(newAppointment);

        setDateTime("");
        setReason("");
        setCustomer("");
        setVin("");
        setTechnician("");
     
      
    }
  };

  const loadTechs = async () => {
    const res = await fetch('http://localhost:8080/api/technicians/')
    if (res.ok){
        const data = await res.json()
        setTechnicians(data.technicians)
    } 
}

useEffect(()=>{
loadTechs()
},[])

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="bg-white">Create a Service Appointment</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input
                value={vin}
                onChange={handleVinChange}
                placeholder="vin"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={customer}
                onChange={handleCustomerChange}
                placeholder="customer"
                required
                type="text"
                name="customer"
                id="customer"
                className="form-control"
              />
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={dateTime}
                onChange={handleDateTimeChange}
                placeholder="YYYY-MM-DD"
                required
                type="text"
                name="dateTime"
                id="dateTime"
                className="form-control"
              />
              <label htmlFor="dateTime">Date and time</label>
            </div>
            <div className="mb-3">
              <select
                value={technician}
                onChange={handleTechnicianChange}
                required
                name="technician"
                id="technician"
                className="form-select">
                <option value="">Choose a Tech</option>
                {technicians.map((technician) => {
                  return (
                    <option key={technician.id} value={technician.id}>
                      {technician.first_name} {technician.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                value={reason}
                onChange={handleReasonChange}
                placeholder="reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
