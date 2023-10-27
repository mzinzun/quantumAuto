import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';

function Customers(props){
    const [customers, setCustomers] = useState([]);
    const [update, setUpdate] = useState(false);
    async function getData(){
        const response = await fetch("http://localhost:8090/api/customers/")
        const result = await response.json();
        const data = result.customers;
        setCustomers(data)
        setUpdate(true);
    }
    function deleteCustomer(e){
      console.log('record to delete: ',e.target.id);
      const cust_id = e.target.id;
      const delURL = `http://localhost:8090/api/customers/${cust_id}/`
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
    <h1>Customers List</h1>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>City/State</th>
          <th>Zip</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer,idx)=>{
            return(
            <tr key={idx} >
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.address}</td>
                <td>{customer.city_state}</td>
                <td>{customer.zip}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.id}</td>
                <td><button className="btn btn-info"
                  id={customer.id}
                  onClick = {deleteCustomer}>delete</button></td>
            </tr>
            )
        })}
      </tbody>
    </Table>
    </>
  );
}

export default Customers;
