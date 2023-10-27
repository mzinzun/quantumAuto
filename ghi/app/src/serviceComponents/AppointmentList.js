import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AppointmentList(){
    const [apptList, setApptList] = useState([])
    const [stateChanged, setStateChanged] = useState(true)

    const loadAppts = async () => {
        const res = await fetch('http://localhost:8080/api/appointments/')
        if (res.ok){
            const data = await res.json()
            setApptList(data.appointments)
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

useEffect(()=>{
  loadAppts()
},[stateChanged])

// const deleteAppt = async (event) => {
//   const apptID = event.target.value;
//   console.log("e:", event)
//   const Url = `http://localhost:8080/api/appointment/${apptID}`;
//   const fetchConfig = {
//     method: "delete",
//   };
//   const response = await fetch(Url, fetchConfig);
//   if (response.status === 200) {
//     const newApptList = apptList.filter((appt) => appt.id != apptID);
//     setApptList(newApptList);
//   }
// };

return (
        
    <div className="row ">
         <div className="mt-2 mb-2">
            <Link to="/appointments/new" className="btn btn-info btn-md ">
            Add Appointment
            </Link>
         </div>

        <h1 className="mb-5 mt-3">Appointment Tickets</h1>
    
        {apptList.map((appt, i) =>
                    {
                        if (appt.status === "created")
                        { 
                            return ( 
                              <div className="col-lg-4 col-md-6 mb-4" key={appt.id}>
                              <div className= {appt.vip ? "card border-4 border-warning":"card"}>
                                <div className="card-body ">
                                  <h5 className="card-title">Ticket {i+1}</h5>
                                  <p className="card-text"> <span className="fw-bold">Vin:</span> {appt.vin}</p>
                                  <p className="card-text"> <span className="fw-bold">Name:</span> {appt.customer}</p>
                                  <p className="card-text"><span className="fw-bold">Vip?:</span> {appt.vip ? "Yes" : "No"}</p>
                                  <p className="card-text"> <span className="fw-bold">Date:</span> {formatDate(appt.date_time)}</p>
                                  <p className="card-text"> <span className="fw-bold">Time:</span> {formatTime(appt.date_time)}</p>
                                  <p className="card-text"> <span className="fw-bold">Tech:</span>  {appt.technician.first_name} {appt.technician.last_name}</p>
                                  <p className="card-text"><span className="fw-bold">Why: </span> {appt.reason}</p>
                                  <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-success " onClick={() => handleFinishStatus(appt.id)}>Finish</button>
                                        <button type="button" className="btn btn-danger" onClick={() => handleCancelStatus(appt.id)}>Cancel</button>
                                        {/* <button onClick={deleteAppt} className="btn btn-warning" value={appt.id}>Delete</button> */}
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

export default AppointmentList;