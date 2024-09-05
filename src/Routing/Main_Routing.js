import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../Pages/Sidebar.js';
import Dashboard from '../Pages/Dashboard';
import Reservation from '../Pages/Reservation';
import AddReservation from '../Pages/AddReservation';
import Users from '../Pages/Users';
import Location from '../Pages/Location.js';

const Main_Routing = () => {
  return (
    <>
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ width: '80%', padding: '20px' }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/location" element={<Location />} />
              <Route path="/reservation" element={<Reservation/>}>
                {/* <Route path="add" element={<AddReservation />} /> */}
              </Route>
              <Route path="/users" element={<Users />} />
              <Route path="/add" element={<AddReservation />} />

            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default Main_Routing;
