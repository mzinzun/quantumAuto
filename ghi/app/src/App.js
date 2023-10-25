import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import {Customers, Sales, SalesPeople, CreateSale, CreateCustomer, CreateSalesPerson} from './salesComponents/index';
import Nav from './Nav';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
