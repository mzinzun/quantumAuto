import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import {Customers, Sales, SalesPeople, CreateSale, CreateCustomer, CreateSalesPerson} from './salesComponents/index';
import Nav from './Nav';
import TechnicianForm from './serviceComponents/TechnicianForm';
import TechnicianList from './serviceComponents/TechnicianList';
import AppointmentForm from './serviceComponents/AppointmentFrom';
import AppointmentList from './serviceComponents/AppointmentList';
import AppointmentHistory from './serviceComponents/AppointmentHistory';
import ManufacturerForm from './inventoryComponents/ManufacturerForm';
import ManufacturerList from './inventoryComponents/ManufacturerList';
import ModelList from './inventoryComponents/ModelList';
import ModelForm from './inventoryComponents/ModelForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/salespeople" element={<SalesPeople />} />
          <Route path="/createCustomer" element={<CreateCustomer />} />
          <Route path="/createSales" element={<CreateSale />} />
          <Route path="/creatSalesPerson" element={<CreateSalesPerson />} />
          <Route path="/technicians">
            <Route index element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
            </Route>
            <Route path="/appointments">
            <Route index element={<AppointmentList />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="all" element={<AppointmentHistory />} />
            </Route>
            <Route path="/manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
            </Route>
            <Route path="/models">
            <Route index element={<ModelList />} />
            <Route path="new" element={<ModelForm />} />
            </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
