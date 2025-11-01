import React, { useState, useEffect } from 'react';
import './SearchStyle.css';
import '../GeneralStyles/Card.css';
import { Link, NavLink } from 'react-router-dom';
import { useRef } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Logo from '../GeneralStyles/Logo.png';
import { fetchAllCars } from '../CarService';
export default function SearchPage() {
  document.title = "Bilal Motors - Search";
  const [cars, setCars] = useState([]);
  const [carNum, setCarNum] = React.useState("");
  const [carName, setCarName] = React.useState("");
  const [customer, setCustomer] = React.useState("");
  const [displayedCars, setDisplayedCars] = useState([]);  

  useEffect(() => {
    async function fetchAndSetCars() {
      const allCars = await fetchAllCars();
      setCars(allCars); 
    }
    fetchAndSetCars();
  }, []);

  const Search = async (event) => {
    event.preventDefault();
    async function fetchCars() {
      let filteredCars = [...cars]; 
      if(carNum !== "") {
        filteredCars = filteredCars.filter(car => car.carNumber.includes(carNum));
      }
      if(carName !== "") {
        filteredCars = filteredCars.filter(car => car.Name.toLowerCase().includes(carName.toLowerCase()));
      }
      if(customer !== "") {
        filteredCars = filteredCars.filter(car => car.CustomerName.toLowerCase().includes(customer.toLowerCase()));
      }
      
      setDisplayedCars(filteredCars);
    }
    fetchCars();
  }
  
  
  return (
    <>
      <div className='searchGridBody'>
      <div className="SearchFormDiv"> 
      <h1 style={{textAlign:'left',marginLeft:'20px'}}> <FontAwesomeIcon icon={faBars} size='2xs'/> חיפוש</h1>
        <form method="post" className='SearchForm' onSubmit={Search}>
          <input type="text" placeholder='מספר רכב' onChange={(event) => setCarNum(event.target.value)} style={{textAlign:'center'}}/><br/>
          <input type="text"  placeholder='שם רכב' onChange={(event) => setCarName(event.target.value)} style={{textAlign:'center'}}/><br/>
          <input type="text"  placeholder='שם לקוח' onChange={(event) => setCustomer(event.target.value)}style={{textAlign:'center'}}/><br/>
          <input type="submit" value="חיפוש" />
        </form>
      </div>
      <div className='ResultDiv'>
      <div className="Cars">
    {displayedCars.map((car) => (
      <Link to={`/CarProfile/${car._id}`} style={{ color: 'black', textDecoration: 'none' }}>
      <div className="Carcard">
        <img className='Cardimg' src={car.Img1} alt={car.Name}/>
        <div className="container">
                <span className="CarName" style={{ fontSize: '15px' }}><b>{car.Name}</b></span>
                <span><b>שנה :</b>{car.Year}</span>
                <span><b>יד :</b>{car.Hand}</span>
                <span><b>נפח מנוע :</b>{car.Capacity}</span>
                <span><b>קילומטראז': </b>{car.Km}</span>
              </div>
      </div>
    </Link>
        ))}
  </div>
      </div>
      </div>
    </>
  );
}
