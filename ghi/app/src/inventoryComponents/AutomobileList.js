import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AutomobileList(){
    const [autoList, setAutoList] = useState([])

    const loadAutos = async () => {
        const res = await fetch('http://localhost:8100/api/automobiles/')
        if (res.ok){
            const data = await res.json()
            console.log('data:', data.autos)
            setAutoList(data.autos)
        } else {
            setAutoList([])
        }
    }

useEffect(()=>{
    loadAutos()
},[])

return (
        
    <div className="row ">
         <div className="mt-2 mb-2">
            <Link to="/automobiles/new" className="btn btn-info btn-md ">
            Automobile List
            </Link>
        </div>

        <h1 className="mb-5 mt-3">Our Cars</h1>
    

    {autoList.map((auto, i) => (
      <div className="col-lg-4 col-md-6 mb-4" key={i}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Automobile {auto.id} </h5>
            <p className="card-text"> <span className="fw-bold">Color</span> {auto.color}</p>
            <p className="card-text"> <span className="fw-bold">Year</span> {auto.year}</p>
            <p className="card-text"> <span className="fw-bold">Vin</span> {auto.vin}</p>
            <p className="card-text"> <span className="fw-bold">Model</span> {auto.model.name}</p>
          </div>
        </div>
      </div>
    )
    )}
  </div>
)

    }

export default AutomobileList;