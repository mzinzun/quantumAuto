import React, {useState, useEffect} from "react";

import { Form, Button, FormControl } from 'react-bootstrap';
import SalesForm from './SalesForm'

function CreateSale(props) {


    const [autos, setAutos] = useState([]);
    const [salespeople, setSalesPeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    async function getData(){
        const autoURL='http://localhost:8100/api/automobiles/';
        const sellersURL = 'http://localhost:8090/api/salespeople/';
        const customerURL = 'http://localhost:8090/api/customers/';
        // fetch data for autos
        const autosData = await fetch(autoURL);
        const holdAutos = await autosData.json();
        setAutos(holdAutos.autos)

        // fetch data for Sales people
        const salesPeopleData = await fetch(sellersURL);
        const holdSalesPeople = await salesPeopleData.json();
        setSalesPeople(holdSalesPeople.sales_people);
        // fetch data for customers
        const customersData = await fetch(customerURL);
        const holdCustomers= await customersData.json();
        setCustomers(holdCustomers.customers);
    }
    useEffect((props)=>{
        getData();
    },[])



    return (
        <>
            <h1>Create Sale</h1>
            <SalesForm autos={autos} customers={customers} salespeople={salespeople}/>
        </>
    )
}
export default CreateSale
