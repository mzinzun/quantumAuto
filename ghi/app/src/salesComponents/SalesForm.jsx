import React, {useState, useEffect} from "react";
import { Form, Button, FormControl } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

function SalesForm({autos, customers, salespeople}){
    const emptyFields = {
        "automobile": '',
        "salesperson": '',
        "customer": '',
        "price": '',
    }
    const navigate = useNavigate();
    const [formData, setFormData] = useState(emptyFields)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    async function handleSubmit(e){
        e.preventDefault();
        console.log(formData);
        const fetchURL='http://localhost:8090/api/sales/';
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
            navigate('/sales');
        }
    };
    return(
         <Form className="w-50" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Vehicle</Form.Label>
                <FormControl as="select"
                    id="automobile"
                    name="automobile"
                    onChange={handleChange}
                    value={formData.automobile}>
                        <option value="">Select Vehicle</option>
                        {autos.map((auto,idx)=><option key={idx} value={auto.id}>{auto.color}</option>)}

                </FormControl>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sales Person</Form.Label>
                <FormControl as="select"
                    id="salesperson"
                    name="salesperson"
                    onChange={handleChange}
                    value={formData.salesperson}>
                        <option value="">Select Sales Person</option>
                        {salespeople.map((person,idx)=><option key={idx} value={person.id}>{person.first_name}</option>)}
                </FormControl>
            </Form.Group>
            <Form.Group>
                <Form.Label>Customer</Form.Label>
                <FormControl as="select"
                    id="customer"
                    name="customer"
                    onChange={handleChange}
                    value={formData.customer}>
                        <option value="">Select Customer</option>
                        {customers.map((person,idx)=><option key={idx} value={person.id}>{person.first_name}</option>)}
                </FormControl>
            </Form.Group>
            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
export default SalesForm
