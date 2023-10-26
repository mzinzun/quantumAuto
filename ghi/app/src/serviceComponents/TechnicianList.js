import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TechnicianList(){
    const [techList, setTechList] = useState([])

    const loadTechs = async () => {
        const res = await fetch('http://localhost:8080/api/technicians/')
        if (res.ok){
            const data = await res.json()
            // console.log('data:', data.technicians)
            setTechList(data.technicians)
        } else {
            setTechList([])
        }
    }

useEffect(()=>{
    loadTechs()
},[])

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