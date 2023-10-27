import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AppointmentHistory(){
    const [apptList, setApptList] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [stateChanged, setStateChanged] = useState(true)

    const loadAppts = async () => {
        const res = await fetch('http://localhost:8080/api/appointments/')
        if (res.ok){
            const data = await res.json()
            // console.log('data:', data.appointments)
            setApptList(data.appointments)
            setFilteredData(data.appointments)
        } else {
            setApptList([])
        }
        
    }
    const handleFinishStatus = async (appointmentId)=>{
        const url = `http://localhost:8080/api/appointments/${appointmentId}/finish/`
        const fetchConfig = {
          method: "put",
        };
        const response = await fetch(url, fetchConfig);
        if (response.status === 200) {
          let temp = !stateChanged
          setStateChanged(temp)
          console.log(`Appointment ${appointmentId} is finished`)
      }}
      
      
      const handleCancelStatus = async (appointmentId)=>{
        const url = `http://localhost:8080/api/appointments/${appointmentId}/cancel/`
        const fetchConfig = {
          method: "put",
        };
        const response = await fetch(url, fetchConfig);
        if (response.status === 200) {
          let temp = !stateChanged
          setStateChanged(temp)
          console.log(`Appointment ${appointmentId} is cancelled`)
      }}

useEffect(()=>{
  loadAppts()
},[stateChanged])

const formatDate = (dateTime) =>
{
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    return new Date(dateTime).toLocaleString(undefined, options);
};

const formatTime = (dateTime) =>
{
    const options = {
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Date(dateTime).toLocaleString(undefined, options);
};


const search = (e) => {
  // Get the search text from the input field
  const searchText = e.target.value.toLowerCase();

  // Filter the appointment list based on the search text
  const filteredAppointments = apptList.filter(appointment =>
    appointment.vin.toLowerCase().includes(searchText)
  );

  // Update the state with the filtered data
  setFilteredData(filteredAppointments);
}


return (
        
    <div className="row ">
         <div className="mt-2 mb-2">
         <div className="form-floating mb-3">
              <input
              
                onChange={search}
                placeholder="Search Vin"
                type="text"
                name="Search"
                id="Search"
              />
            </div>
            <Link to="/appointments/new" className="btn btn-info btn-md ">
            Add Appointment
            </Link>
         </div>

        <h1 className="mb-5 mt-3">Appointment History</h1>
    
        {filteredData.map((appt,i) =>
                    {
                        {
                            return (
                              <div className="col-lg-4 col-md-6 mb-4" key={appt.id}>
                              <div className= {appt.vip ? "card border-4 border-warning":"card"}>
                                <div className="card-body ">
                                  <h5 className="card-title">Ticket {i+1}</h5>
                                  <p className="card-text"> <span className="fw-bold">Vin:</span> {appt.vin}</p>
                                  <p className="card-text"> <span className="fw-bold">Status:</span> {appt.status}</p>
                                  <p className="card-text"> <span className="fw-bold">Name:</span> {appt.customer}</p>
                                  <p className="card-text"><span className="fw-bold">Vip?:</span> {appt.vip ? "Yes" : "No"}</p>
                                  <p className="card-text"> <span className="fw-bold">Date:</span> {formatDate(appt.date_time)}</p>
                                  <p className="card-text"> <span className="fw-bold">Time:</span> {formatTime(appt.date_time)}</p>
                                  <p className="card-text"> <span className="fw-bold">Tech:</span>  {appt.technician.first_name} {appt.technician.last_name}</p>
                                  <p className="card-text"><span className="fw-bold">Why: </span> {appt.reason}</p>
                                  <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-success " onClick={() => handleFinishStatus(appt.id)}>Finish</button>
                                        <button type="button" className="btn btn-danger" onClick={() => handleCancelStatus(appt.id)}>Cancel</button>
                                  </div>
                  
                                </div>
                              </div>
                            </div>
                            );
                        }
                    })}
    </div>
)

    }

export default AppointmentHistory;