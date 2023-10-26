import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap';

function CreateSalesPerson(props) {
    const navigate = useNavigate();
    const emptyFields = {
        first_name: "",
        last_name: "",
        employee_id: ""
    }
    const [formData, setFormData] = useState(emptyFields)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(e){
        e.preventDefault();
        console.log(formData);
        const fetchURL='http://localhost:8090/api/salespeople/';
        const data = {...formData}
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(fetchURL, fetchConfig)
        if (response.ok) {
            // put popup here
            setFormData(emptyFields);
            navigate('/salespeople');
        }
    };
    return (
        <>
            <h1>Create Sales Person</h1>
            <Form className="w-50" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
            </Form.Group>


            <Form.Group>
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Employee id"
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </>
    )
}
export default CreateSalesPerson
