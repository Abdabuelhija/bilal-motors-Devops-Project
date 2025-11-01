import React, { useState, useEffect } from 'react';
import './SoldStyle.css';
import '../GeneralStyles/Card.css';
import { useParams, Navigate, Link } from "react-router-dom";
import { fetchAllCars } from '../CarService';

export default function SoldPage() {
  document.title = "Bilal Motors - Sold";
  const [cars, setCars] = useState([]);
  const [displayedCars, setDisplayedCars] = useState([]);

  useEffect(() => {
    async function fetchAndSetCars() {
      const allCars = await fetchAllCars();
      const SoldCars = allCars.filter(car => car.isSold);
      setCars(SoldCars);
      setDisplayedCars(SoldCars);
    }
    fetchAndSetCars();
  }, []);

  const ShowSoldCars = (event) => {
    event.preventDefault();
    setDisplayedCars(cars);
  }

  const ShowByEntranceDate = (event) => {
    event.preventDefault();
    const sortedData = [...cars].sort((a, b) => new Date(b.EntranceDate) - new Date(a.EntranceDate));
    setDisplayedCars(sortedData);
  }

  const ShowBySellingDate = (event) => {
    event.preventDefault();
    const sortedData = [...cars].sort((a, b) => new Date(b.SellingDate) - new Date(a.SellingDate));
    setDisplayedCars(sortedData);
  }

  return (
    <>
      <div className="buttons" >
        <button className="orginal-button" onClick={ShowSoldCars}>כל הנמכרים</button>
        <button className="Entrance-button" onClick={ShowByEntranceDate}>סינון לפי כניסה למגרש</button>
        <button className="Entrance-button" onClick={ShowBySellingDate} >סינון לפי תאריך המכירה</button>
      </div>
      <br /><br /><br />
      <div className="Cars">
        {displayedCars.map((car) => (
          <Link to={`/CarProfile/${car._id}`} style={{ color: 'black', textDecoration: 'none' }}>
            <div className="Carcard">
              <img className='Cardimg' src={car.Img1} alt={car.Name} />
              <div className="container">
                <span className="CarName" style={{ fontSize: '15px' }}><b>{car.Name}</b></span>
                <span><b>:שנה </b>{car.Year}</span>
                <span><b>:יד </b>{car.Hand}</span>
                <span><b>:נפח מנוע </b>{car.Capacity}</span>
                <span><b>:קילומטראז' </b>{car.Km}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
