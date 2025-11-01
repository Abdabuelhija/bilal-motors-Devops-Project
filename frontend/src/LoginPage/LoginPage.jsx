import React, { useState } from 'react';
import './LoginStyle.css';
import Logo from '../GeneralStyles/Logo.png';
import { useParams, useNavigate, Link } from "react-router-dom";
import {checkPassword } from '../AdminService';
export default function LoginPage({ setUser }) {
  document.title = "Bilal Motors - Login";
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const [Message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await checkPassword(inputValue);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(localStorage.getItem('user'));
      navigate("/");
    }
     else {
      setMessage("Wrong password");
    }
  };

  return (
    <div className='LoginBody'>
      <div className='FormDiv'>
        <h1>התחברות</h1>
        {Message && <small style={{color:'red'}}>{Message}</small>}
        <form onSubmit={handleLogin}>
          <label style={{ fontSize: '30px', color: '#702C77', fontWeight: 'bold' }}>סיסמה</label>
          <br />
          <input type='password' value={inputValue} onChange={(e) => setInputValue(e.target.value)} required/>
          <input type='submit' value='כניסה' />
        </form>
        <Link to={`/ResetPassword`} style={{ color: 'black', textDecoration: 'none' }}>איפוס סיסמה</Link> <br/>
        <img src={Logo} alt='Logo' className='Logo' />
      </div>
    </div>
  );
}