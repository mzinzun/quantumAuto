import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap';

function SalesHistory(props) {
    const [inputField, setInputField] = useState('')
    function handleChange(e){
        setInputField(e.target.value)
    }
    const handleSearch = async (e)=>{
        e.preventDefault();
        console.log("ready to search", inputField)
        let response = await fetch('http://localhost:8090/api/sales/');
        let data = await response.json();

        console.log(data)
    }
    return (
        <>
            <h1>Sales Person Sales Histort</h1>
            <Form className="w-50" onSubmit={handleSearch}>
            <Form.Group>
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Employee id"
                    name="employee_id"
                    value={inputField}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit" >Search</Button>
            </Form>
        </>
    )
}
export default SalesHistory
