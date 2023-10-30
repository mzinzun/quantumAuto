import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ManufacturerList(){
    const [manuList, setManuList] = useState([])

    const loadManus = async () => {
        const res = await fetch('http://localhost:8100/api/manufacturers/')
        if (res.ok){
            const data = await res.json()
            setManuList(data.manufacturers)
        } else {
            setManuList([])
        }
    }

useEffect(()=>{
    loadManus()
},[])

return (

    <div className="row services">
         <div className="mt-2 mb-2">
            <Link to="/manufacturers/new" className="btn btn-info btn-md ">
            Add A Manufacturer
            </Link>
        </div>

        <h1 className="mb-5 mt-3">Our Esteemed Manufacturers</h1>


    {manuList.map((manu, i) => (
      <div className="col-lg-4 col-md-6 mb-4" key={i}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{manu.name} </h5>

            <p className="card-text"> </p>

            {/* <button
                onClick={deleteShoe}
                className="btn btn-primary"
                value={shoe.id}
              >
                Delete
              </button> */}

          </div>
        </div>
      </div>
    )
    )}
  </div>
)

    }

export default ManufacturerList;
