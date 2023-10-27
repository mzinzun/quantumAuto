import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';

function SalesPeople(props) {
    const [salespeople, setSalesPeople] = useState([]);
    const [update, setUpdate] = useState(false);
    async function getData() {
        const response = await fetch("http://localhost:8090/api/salespeople/")
        const result = await response.json();
        const salespeople = result.salespeople;
        setSalesPeople(salespeople);
        setUpdate(true);
    }
    function deletePerson(e) {
        const sp_id = e.target.id;
        const delURL = `http://localhost:8090/api/salespeople/${sp_id}/`
        const response = fetch(delURL);
        let set = !update;
        setUpdate(set);
    }
    useEffect(() => {
        getData();
    }, [update])
    return (
        <>
            <h1>List of Sales People</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Employee id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map((salesperson, idx) => {
                        return (
                            <tr key={idx} >
                                <td>{salesperson.employee_id}</td>
                                <td>{salesperson.first_name}</td>
                                <td>{salesperson.last_name}</td>
                                <td><button className="btn btn-info"
                                    id={salesperson.id}
                                    onClick={deletePerson}>delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}
export default SalesPeople
