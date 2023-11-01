import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AppointmentHistory() {
  // State variables to manage appointment data
  const [apptList, setApptList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [stateChanged, setStateChanged] = useState(true);

  // Function to load appointment data from the server
  const loadAppts = async () => {
      const res = await fetch('http://localhost:8080/api/appointments/');
      if (res.ok) {
          const data = await res.json();
          // Set the appointment list and filtered data from the server response
          setApptList(data.appointments);
          setFilteredData(data.appointments);
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
          let temp = !stateChanged;
          setStateChanged(temp);
          console.log(`Appointment ${appointmentId} is finished`);
      }
  }

  // Function to cancel an appointment
  const handleCancelStatus = async (appointmentId) => {
      const url = `http://localhost:8080/api/appointments/${appointmentId}/cancel/`;
      const fetchConfig = {
          method: "put",
      };
      const response = await fetch(url, fetchConfig);
      if (response.status === 200) {
          let temp = !stateChanged;
          setStateChanged(temp);
          console.log(`Appointment ${appointmentId} is canceled`);
      }
  }

  // Load appointments when the component is mounted or 'stateChanged' changes
  useEffect(() => {
      loadAppts();
  }, [stateChanged]);

  // Helper functions to format date and time
  const formatDate = (dateTime) => {
      const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
      };
      return new Date(dateTime).toLocaleString(undefined, options);
  };

  const formatTime = (dateTime) => {
      const options = {
          hour: '2-digit',
          minute: '2-digit',
      };
      return new Date(dateTime).toLocaleString(undefined, options);
  };

  // Function to filter appointments based on the search input
  const search = (e) => {
      setFilteredData(apptList.filter(appointment => appointment.vin.toLowerCase().includes(e.target.value.toLowerCase())))
  }

// const search = () => {
//   // Filter the appointment list based on the search text
//   const filteredAppointments = apptList.filter(appointment =>
//     appointment.vin.toLowerCase().includes(searchText.toLowerCase())
//   );

//   // Update the state with the filtered data
//   setFilteredData(filteredAppointments);
// }

// const handleSubmit = (e) => {
//   e.preventDefault(); // Prevent the form from submitting and refreshing the page
//   search(); // Call the search function when the form is submitted
// }


return (

    <div className="row services">
         <div className="mt-2 mb-2">
         <div className="form-floating mb-3">

          {/* <form onSubmit={handleSubmit}> Add a form element and set onSubmit to call handleSubmit
        <input
          onChange={(e) => setSearchText(e.target.value)} // Update the searchText state
          value={searchText} // Set the value of the input field to the searchText state
          placeholder="Search Vin"
          type="text"
          name="Search"
          id="Search"
        />
        <button type="submit">Submit</button> {/* Add a submit button */}
      {/* </form> */}
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
