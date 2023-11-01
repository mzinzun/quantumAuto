import React, { useState, useEffect } from "react";

import { Table, Form, Button, FormControl } from 'react-bootstrap';

function SalesHistory(props) {
    const [inputField, setInputField] = useState('');
    const [salespeople, setSalesPeople] = useState(['','','','']);
    const [sales, setSales] = useState([])
    const [update, setUpdate] = useState(false);
    async function getData() {
        const response = await fetch("http://localhost:8090/api/salespeople/")
        const result = await response.json();
        const salespeople = result.salespeople;
        setSalesPeople(salespeople);
        setUpdate(true);
    }
    function handleChange(e){
        setInputField(e.target.value)
    }
    const handleSearch = async (e)=>{
        e.preventDefault();
        console.log("ready to search", inputField)
        let response = await fetch('http://localhost:8090/api/sales/');
        let data = await response.json();
        console.log("all sales: ", data.sales)
        const employeeSales = await (data.sales).filter(x=>x.salesperson.employee_id === inputField)
        setSales(employeeSales);
        console.log("employeeSales: ", employeeSales);
        console.log("salesperson: ", inputField);
        // let change = !update;
        // setUpdate(change);

    }
    useEffect(() => {
        getData();
    }, [update])
    return (
        <div className="w-75 mx-auto salesMain">
            <h1>Sales History</h1>
            <Form className="w-25" onSubmit={handleSearch}>
            <Form.Label>Sales Person</Form.Label>
                <FormControl as="select"
                    id="salesperson"
                    name="salesperson"
                    onChange={handleChange}
                    value={inputField}>
                        <option value="">Select Sales Person</option>
                        {salespeople.map((person,idx)=><option key={idx} value={person.employee_id}>{person.last_name}, id: {person.employee_id}</option>)}
                </FormControl>
            <Button variant="primary" type="submit" >Search</Button>
            </Form>
            <Table striped className= " w-75 tb bordered hover text-success">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, idx) => {
                        return (
                            <tr key={idx} >
                                <td>{sale.salesperson.employee_id}</td>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
export default SalesHistory
