import './App.css'
import React, { useState, useEffect } from 'react';
import { Routes, Route ,Navigate} from 'react-router-dom'
import Navbar from './Navbar/NavPage'
import Sold from './Sold/SoldPage'
import Stock from './Stock/stockPage'
import LoginPage from './LoginPage/LoginPage'
import CarProfile from './CarProfile/CarProfilePage';
import Search from './Search/SearchPage';
import ResetPassword from './ResetPassword/ResetPassword';
import { checkPassword } from './AdminService';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  return (
      <>
      {user &&  (
          <div className='Nav'>
            <Navbar setUser={setUser}/>
          </div>
      )}
        <div className='RoutesStyle'>
        <Routes>
            <Route path="/" element={user ? <Stock/> : <Navigate to="/LoginPage" replace />}/>
            <Route path="/Stock" element={user ? <Stock/> : <Navigate to="/LoginPage" replace />}/ >
            <Route path="/Sold" element={user ? <Sold/> : <Navigate to="/LoginPage" replace />}  />
            <Route path="/CarProfile/:id" element={user ? <CarProfile/> : <Navigate to="/LoginPage" replace />} />
            <Route path="/Search/" element={user ? <Search/> : <Navigate to="/LoginPage" replace />} />
            <Route path="/LoginPage" element={<LoginPage setUser={setUser}/>}/>
            <Route path="/ResetPassword" element={<ResetPassword/>}/>
        </Routes>
        </div>
      </>
  )
}

export default App;
