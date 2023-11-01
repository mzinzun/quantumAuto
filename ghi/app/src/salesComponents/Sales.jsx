import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';

function Sales(props) {
  const [sales, setSales] = useState([]);
  const [update, setUpdate] = useState(false);
  async function getData() {
    const response = await fetch("http://localhost:8090/api/sales/")
    const result = await response.json();
    const data = await result.sales;
    setSales(data)
    setUpdate(true);
  }
  function deleteSale(e) {
    const cust_id = e.target.id;
    const delURL = `http://localhost:8090/api/sales/${cust_id}/`
    const response = fetch(delURL);
    let set = !update;
    setUpdate(set);
  }
  useEffect(() => {
    getData();
  }, [update])
  return (
    <div className="w-75 mx-auto salesMain">
      <h1>Sales List</h1>
      <Table striped bordered hover className="">
        <thead>
          <tr>
            <th>Automobile</th>
            <th>Sales Person</th>
            <th>Customer</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, idx) => {
            return (
              <tr key={idx} >
                <td>{sale.automobile.vin}</td>
                <td>{sale.salesperson.first_name} {sale.salesperson.last_name} </td>
                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                <td>${sale.price}</td>
                <td><button className="btn btn-info"
                  id={sale.id}
                  onClick={deleteSale}>delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
export default Sales
