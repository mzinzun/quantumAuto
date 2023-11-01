import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AppointmentList() {
  // State to store the list of appointments and to trigger re-renders
  const [apptList, setApptList] = useState([]);
  const [stateChanged, setStateChanged] = useState(true);

  // Function to fetch and load appointments from the API
  const loadAppts = async () => {
      const res = await fetch('http://localhost:8080/api/appointments/');
      if (res.ok) {
          const data = await res.json();
          setApptList(data.appointments);
      } else {
          setApptList([]);
      }
  }

  // Function to mark an appointment as finished
  const handleFinishStatus = async (appointmentId) => {
      const url = `http://localhost:8080/api/appointments/${appointmentId}/finish/`;
      const fetchConfig = {
          method: "put",
      };
      const response = await fetch(url, fetchConfig);
      if (response.status === 200) {
          // Toggle the stateChanged flag to trigger a re-render
          let temp = !stateChanged;
          setStateChanged(temp);
          console.log(`Appointment ${appointmentId} is finished`);
      }
  }

  // Function to mark an appointment as canceled
  const handleCancelStatus = async (appointmentId) => {
      const url = `http://localhost:8080/api/appointments/${appointmentId}/cancel/`;
      const fetchConfig = {
          method: "put",
      };
      const response = await fetch(url, fetchConfig);
      if (response.status === 200) {
          // Toggle the stateChanged flag to trigger a re-render
          let temp = !stateChanged;
          setStateChanged(temp);
          console.log(`Appointment ${appointmentId} is canceled`);
      }
  }

  // Function to format a date
  const formatDate = (dateTime) => {
      const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
      };
      return new Date(dateTime).toLocaleString(undefined, options);
  };

  // Function to format a time
  const formatTime = (dateTime) => {
      const options = {
          hour: '2-digit',
          minute: '2-digit',
      };
      return new Date(dateTime).toLocaleString(undefined, options);
  };

  // Use the useEffect hook to load appointments when the stateChanged flag changes
  useEffect(() => {
      loadAppts();
  }, [stateChanged]);


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
        
    <div className="services">
         <div className="mt-2 mb-2">
            <Link to="/appointments/new" className="btn btn-info btn-md ">
            Add Appointment
            </Link>
         </div>

        <h1 className="mb-5 mt-3">Appointment Tickets</h1>
        <div className="row">
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
    </div>
  )

}

export default AppointmentList;
