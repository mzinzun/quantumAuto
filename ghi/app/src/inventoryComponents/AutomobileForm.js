import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function AutomobileForm() {

  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [models, setModels] = useState([]);
  const [model, setModel] = useState("");
  const navigate = useNavigate()


  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };
  const handleYearChange = (event) => {
    const value = event.target.value;
    setYear(value);
  };
  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  };
  const handleModelChange = (event) => {
    const value = event.target.value;
    setModel(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
    color: color,
    year: year,
    vin: vin,
    model_id: model
 }
 console.log("form:",data)

    const AutomobileUrl = `http://localhost:8100/api/automobiles/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await fetch(AutomobileUrl, fetchConfig);
    console.log(response)
    if (response.ok) {
      const newAuto = await response.json();
      console.log(newAuto);

       navigate("/automobiles")

    }
  };
  const loadModels = async () => {
    const res = await fetch('http://localhost:8100/api/models/')
    if (res.ok){
        const data = await res.json()
        console.log('data:', data.models)
        setModels(data.models)
    }
}

useEffect(()=>{
loadModels()
},[])

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="bg-white">Create an Automobile</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input
                value={color}
                onChange={handleColorChange}
                placeholder="name"
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={year}
                onChange={handleYearChange}
                placeholder="year"
                required
                type="text"
                name="year"
                id="year"
                className="form-control"
              />
              <label htmlFor="year">Year</label>
            </div>
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
              <label htmlFor="vin">Vin</label>
              </div>
              <div className="mb-3">
              <select
                value={model}
                onChange={handleModelChange}
                required
                name="model"
                id="model"
                className="form-select">
                <option value="">Model</option>
                  {models.map((model) => {
                      return (
                        <option key={model.id} value={model.id}>
                          {model.name} 
                        </option>
                    );
                  })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;
