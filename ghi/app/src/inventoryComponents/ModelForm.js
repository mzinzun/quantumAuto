import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function ModelForm() {

  const [name, setName] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [manufacturer, setManufacturer] = useState("");
  const navigate = useNavigate()


  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };
  const handlePictureURLChange = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  };
  const handleManufacturerChange = (event) => {
    const value = event.target.value;
    setManufacturer(value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
    name: name,
    picture_url: picture_url,
    manufacturer_id: manufacturer
 }
 console.log("form:",data)
    const modelUrl = `http://localhost:8100/api/models/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await fetch(modelUrl, fetchConfig);
    console.log(response)
    if (response.ok) {
      const newModel = await response.json();
      console.log(newModel);

       navigate("/models")
        
    }
  };
  const loadManus = async () => {
    const res = await fetch('http://localhost:8100/api/manufacturers/')
    if (res.ok){
        const data = await res.json()
        console.log('data:', data.manufacturers)
        setManufacturers(data.manufacturers)
    }
}

useEffect(()=>{
loadManus()
},[])

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="bg-white">Create a Model</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input
                value={name}
                onChange={handleNameChange}
                placeholder="name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Model Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={picture_url}
                onChange={handlePictureURLChange}
                placeholder="pictureUrl"
                required
                type="url"
                name="pictureUrl"
                id="pictureUrl"
                className="form-control"
              />
              <label htmlFor="pictureUrl">Picture URL</label>
              </div>

              <div className="mb-3">
              <select
                value={manufacturer}
                onChange={handleManufacturerChange}
                required
                name="manufacturer"
                id="manufacturer"
                className="form-select">
                <option value="">Manufacturer</option>
                  {manufacturers.map((manu) => {
                      return (
                        <option key={manu.id} value={manu.id}>
                          {manu.name} 
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

export default ModelForm;
