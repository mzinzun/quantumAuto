import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';

function Sales(props) {
    const [sales, setSales] = useState([]);
    const [update, setUpdate] = useState(false);
    async function getData(){
        const response = await fetch("http://localhost:8090/api/sales/")
        const result = await response.json();
        const data = await result.sales;
        console.log("data: ", data);
        setSales(data)
        setUpdate(true);
    }
    function deleteSale(e){
      console.log('record to delete: ',e.target.id);
      const cust_id = e.target.id;
      const delURL = `http://localhost:8090/api/sales/${cust_id}/`
      const response = fetch(delURL);
      console.log("response: ", response);
      let set = !update;
      setUpdate(set);
    }
    useEffect(()=>{
        getData();
    },[update])
    return (
        <>
            <h1>Sales List</h1>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>Automobile</th>
          <th>Sales Person</th>
          <th>Customer</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale,idx)=>{
            return(
            <tr key={idx} >
                <td>{sale.automobile.vin}</td>
                <td>{sale.salesperson.first_name} {sale.salesperson.last_name} </td>
                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                <td>${sale.price}</td>
                <td><button className="btn btn-info"
                  id={sale.id}
                  onClick = {deleteSale}>delete</button></td>
            </tr>
            )
        })}
      </tbody>
    </Table>
        </>
    )
}
export default Sales
