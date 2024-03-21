import React, { useState} from "react";
import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap';

function CreateCustomer(props) {
    const navigate = useNavigate();
    const emptyFields = {
        first_name: '',
        last_name: '',
        address: '',
        city_state: '',
        zip: '',
        phone_number: ''
    }
    const [formData, setFormData] = useState(emptyFields)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(e){
        e.preventDefault();
        const fetchURL='http://localhost:8090/api/customers/';
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
            navigate('/customers');
        }
    };

    return (
        <div className="w-75 mx-auto salesMain">
        <h1>Create Customer</h1>
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
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>City/State</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter city/state"
                    name="city_state"
                    value={formData.city_state}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Zip</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    );
};

export default CreateCustomer
