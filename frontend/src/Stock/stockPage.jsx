import React, { useState, useEffect } from 'react';
import './stockStyle.css';
import '../GeneralStyles/Card.css';
import { Link, NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { fetchAllCars, addCar, updateIsSold_toFalse ,uploadImage} from '../CarService';

export default function Stock() {
  document.title = "Bilal Motors - All cars";
  const [cars, setCars] = useState([]);
  const [displayedCars, setDisplayedCars] = useState([]);
  const [Message, setMessage] = useState("");
  const [AddCarshow, setAddCarshow] = useState(false);
  const handleAddCarShow = () => setAddCarshow(true);
  const handleAddCarClose = () => {
    setAddCarshow(false);
    setMessage("");
  }

  const [car, setCar] = useState({
    _id: "",
    carNumber: "",
    Name: "",
    Year: "",
    Hand: 0,
    Capacity: "",
    EntranceDate: "",
    isSold: false,
    CustomerName: "",
    SellingDate: "",
    Notes: "",
    Img1: "",
    Img2: "",
    Img3: "",
    Img4: "",
    Price: 0,
    Km: 0
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'file' ? target.files[0] : target.value;
    const name = target.name;
    setCar({
      ...car,
      [name]: value
    });
  };
  

  const handleAddCarSubmit = async (event) => {
    event.preventDefault();
    const data = { ...car };
    if (car.Img1 instanceof File) {
        data.Img1 = await uploadImage(car.Img1);
    }
    if (car.Img2 instanceof File) {
        data.Img2 = await uploadImage(car.Img2);
    }
    if (car.Img3 instanceof File) {
        data.Img3 = await uploadImage(car.Img3);
    }
    if (car.Img4 instanceof File) {
        data.Img4 = await uploadImage(car.Img4);
    }
    const response = await addCar(data);
    if (response) {
        setMessage(<small style={{ color: 'green' }}>הוספת רכב בוצעה בהצלחה </small>);
        setCars(cars => [...cars, response]);
        setDisplayedCars(displayedCars => [...displayedCars, response]);
    }
    else if (response === -1) {
        setMessage(<small style={{ color: 'red' }}>? הרכב נמצא ברכבים הנמכרים , אתה רוצה להחזיר אותו למלאי</small>);
        setshowCarExistModal(true);
    }
    else {
        setMessage(<small style={{ color: 'red' }}>הרכב כבר נמצא במלאי</small>);
    }
}

  useEffect(() => {
    async function fetchAndSetCars() {
      const allCars = await fetchAllCars();
      const StockCars = allCars.filter(car => !car.isSold);
      setCars(StockCars);
      setDisplayedCars(StockCars);
    }
    fetchAndSetCars();
  }, []);


  const ShowAllCars = async (event) => {
    event.preventDefault();
    setDisplayedCars(cars);
  }

  const ShowByEntranceDate = async (event) => {
    event.preventDefault();
    const sortedData = [...cars].sort((a, b) => new Date(b.EntranceDate) - new Date(a.EntranceDate));
    setDisplayedCars(sortedData);
  }

  const ShowByPrice = async (event) => {
    event.preventDefault();
    const sortedData = [...cars].sort((a, b) => b.Price - a.Price);
    setDisplayedCars(sortedData);
  }
  // for car exist Modal 
  const [showCarExistModal, setshowCarExistModal] = useState(false);
  const handleCarExistModalClose = () => {
    setshowCarExistModal(false);
    setMessage("");
  }
  const ResetTheCarToStock = async (event) => {
    const response = await updateIsSold_toFalse(car);
    console.log(car._id);
    if (response) {
      setMessage(<small style={{ color: 'green' }}>הרכב נכנס למלאי</small>);
      setCars(cars => [...cars, response]);
      setDisplayedCars(displayedCars => [...displayedCars, response]);
    }
    else {
      setMessage(<small style={{ color: 'red' }}>שגיאה , תתקשר לעבד</small>);
    }
  }




  return (
    <>
      <div className="buttons">
        <button className="orginal-button" onClick={ShowAllCars}>כל המלאי</button>
        <button className="Entrance-button" onClick={ShowByEntranceDate}>סינון לפי כניסה למגרש</button>
        <button className="Entrance-button" onClick={ShowByPrice}>סינון לפי מחיר</button>
        <button className="Add-car" onClick={handleAddCarShow} ><FontAwesomeIcon icon={faPlus} style={{ Year: "#ffffff", }} /> הוסף רכב </button>
      </div>

      <br /><br /><br />
      <div className="Cars">
        {displayedCars.map((car) => (
          <Link to={`/CarProfile/${car._id}`} style={{ color: 'black', textDecoration: 'none' }}>
            <div className="Carcard">
              <img className='Cardimg' src={car.Img1} alt={car.Name} />
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

      <Modal show={AddCarshow} onHide={handleAddCarClose} animation={false} style={{textAlign:'right'}}>
        <Modal.Header closeButton >
          <Modal.Title ><br /><h1 >הוספת רכה</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Message}
          <form className="row" onSubmit={handleAddCarSubmit}>
            <div className="form-group col-md-6">
              <label for="inputEmail4">שם הרכב</label>
              <input type="text" className="form-control" id="inputName" placeholder="Mazda 3" name="Name" value={car.Name} onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label for="inputEmail4">שנה</label>
              <input type="text" className="form-control" id="inputYear" placeholder="2023" name="Year" value={car.Year} onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label for="inputEmail4">יד</label>
              <input type="number" className="form-control" id="inputHand" placeholder="01" name="Hand" value={car.Hand} onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">נפח</label>
              <input type="text" className="form-control" id="inputSizes" placeholder="2000cc" name="Capacity" value={car.Capacity} onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label for="inputEmail4">כניסה למגרש</label>
              <input type="date" className="form-control" id="inputEntranceDate" placeholder="EntranceDate" name="EntranceDate" value={car.EntranceDate} onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label for="inputEmail4">מחיר</label>
              <input type="number" className="form-control" id="inputPrice" placeholder="50,000" name="Price" value={car.Price} onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label for="inputEmail4" dir="rtl">קילומטראז'</label>
              <input type="number" className="form-control" id="inputKm" placeholder="20000" name="Km" value={car.Km} onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label for="inputEmail4">מספר רכב</label>
              <input type="text" className="form-control" id="CarNumber" placeholder="12345234" name="carNumber" value={car.carNumber} onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-12">
              <label for="inputEmail4">הערות</label>
              <input type="text" className="form-control" id="Notes" placeholder="Test util 2024" name="Notes" value={car.Notes} onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label for="inputAddress">תמונה 1 </label>
              <input type="file" className="form-control" id="Img1" name="Img1" onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label for="inputAddress">תמונה 2</label>
              <input type="file" className="form-control" id="Img2" name="Img2" onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label for="inputAddress">תמונה 3</label>
              <input type="file" className="form-control" id="Img3" name="Img3" onChange={handleInputChange} required />
            </div>
            <div className="form-group col-md-6">
              <label for="inputAddress">תמונה 4</label>
              <input type="file" className="form-control" id="Img4" name="Img4" onChange={handleInputChange} required />
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleAddCarClose}>
                סגור
              </Button>
              <Button variant="primary" type="submit">הוסף</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      {/* Car Exist Modal */}
      <Modal style={{ marginTop: '100px' }} show={showCarExistModal} onHide={handleCarExistModalClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>החזרת הרכב למלאי</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Message && <small style={{ color: 'red' }}>{Message}</small>}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCarExistModalClose} style={{ '--bs-btn-bg': 'red', '--bs-btn-hover-bg': 'red', '--bs-btn-border-Year': 'red' }}>
              לא
            </Button>
            <Button variant="primary" onClick={ResetTheCarToStock} style={{ '--bs-btn-bg': 'green', '--bs-btn-hover-bg': 'green', '--bs-btn-border-Year': 'green' }} >כן</Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

