import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TechnicianList() {
  // state variable 'techList' to hold the list of technicians.
  const [techList, setTechList] = useState([])

  // function to fetch and load the list of technicians.
  const loadTechs = async () => {
      // GET request to the local API 
      const res = await fetch('http://localhost:8080/api/technicians/')
      
      // Check if the response is successful (status code 200).
      if (res.ok) {
          // Parse the JSON data in the response.
          const data = await res.json()
          
          // Update the 'techList' state with the technicians data fetched from the API.
          setTechList(data.technicians)
      } else {
          // If the response is not successful, set 'techList' to an empty array.
          setTechList([])
      }
  }

  // Use the 'useEffect' hook to call 'loadTechs' when the component is mounted.
  useEffect(() => {
      loadTechs()
  }, []) // The empty dependency array ensures it's called only once when the component is mounted.


const deleteTech = async (event) => {
  const techID = event.target.value;
  console.log("e:", event)
  const Url = `http://localhost:8080/api/technicians/${techID}`;
  const fetchConfig = {
    method: "delete",
  };
  const response = await fetch(Url, fetchConfig);
  if (response.status === 200) {
    const newTechList = techList.filter((tech) => tech.id != techID);
    setTechList(newTechList);
  }
};

return (
        
    <div className="row ">
         <div className="mt-2 mb-2">
            <Link to="/technicians/new" className="btn btn-info btn-md ">
            Add A Tech
            </Link>
        </div>

        <h1 className="mb-5 mt-3">Our Esteemed Technicians</h1>
    

    {techList.map((tech, i) => (
      <div className="col-lg-4 col-md-6 mb-4" key={i}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{tech.first_name} {tech.last_name}</h5>
            
            <p className="card-text"> <span className="fw-bold">Id #:</span> {tech.employee_id}</p>
            
            <button
                onClick={deleteTech}
                className="btn btn-danger"
                value={tech.id}
              >
                Delete
              </button>

          </div>
        </div>
      </div>
    )
    )}
  </div>
)

    }

export default TechnicianList;