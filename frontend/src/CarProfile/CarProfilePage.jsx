import React, { useState, useEffect } from 'react';
import './CarProfileStyle.css';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faShekelSign, faTrash, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams ,useNavigate} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { getCarById, updateCarById, markCarAsSold ,deleteCarById} from "../CarService";

export default function CarProfile() {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [Message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const [oldCar, setOldCar] = useState(null);
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
    Km: 0,
  });

  useEffect(() => {
    const fetchCar = async () => {
      const fetchedCar = await getCarById(id);
      if (fetchedCar) {
        setCar(fetchedCar);
        setOldCar(fetchedCar);
        document.title = `Bilal Motors - ${fetchedCar.Name}`;
      }
    };
    fetchCar();
  }, [id]);

  // Update Modal
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const handleUpdateModalClose = () => {
    setshowUpdateModal(false);
    setMessage("");
    setCar(oldCar);
  }
  const handleUpdateModalShow = () => setshowUpdateModal(true);
  const updateCarDetails = async (event) => {
    event.preventDefault();
    try {
      const updatedCar = await updateCarById(id, car);
      if (updatedCar) {
        setMessage("העדכון בוצע בהצלחה");
        setCar(car);
        setOldCar(car);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Sold Modal
  const [showSoldModal, setshowSoldModal] = useState(false);
  const handleSoldModalClose = () => {
    setshowSoldModal(false);
    setMessage("");
    setCar(oldCar);
  }
  const handleSoldModalShow = () => setshowSoldModal(true);
  const SoldCar = async (event) => {
    event.preventDefault();
    try {
      const soldCar = await markCarAsSold(id, car);
      if (soldCar) {
        setMessage("העדכון בוצע בהצלחה");
        setCar(car);
        setOldCar(car);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCar(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const DeleteCar = async (event) => {
    let userConfirmation = window.confirm(" ?  האם אתה בטוח שברצונך למחוק את הרכב?");
    if(userConfirmation) {
      const response = await deleteCarById(id);
      if(response.status === 200) {
        alert("המחיקה בוצעה בהצלחה");
        navigate("/Stock");
      }
      else {
        console.log(`Error in deleting the car: ${response}`);
      }
    }
    else {
      // The user clicked "Cancel", so we don't do anything
    }
  }
  

  // Make a normal Date not like Date in MongoDB
  function formatDate(dateStr) {
    let date = new Date(dateStr);
    return date.getUTCFullYear() + '-' +
      String(date.getUTCMonth() + 1).padStart(2, '0') + '-' +
      String(date.getUTCDate()).padStart(2, '0');
  }

  return (
    <>
      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose} animation={false} style={{ textAlign: 'center' }}>
        <Modal.Header closeButton>
          <Modal.Title><br /><h2>עדכן נתוני הרכב</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Message && <small style={{ color: 'green' }}>{Message}</small>}
          <form class="row" onSubmit={updateCarDetails}>
            <div class="form-group col-md-6">
              <label for="inputName">שם רכב</label>
              <input type="text" class="form-control" id="inputName" name="Name" value={car.Name} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-6">
              <label for="Year">שנה</label>
              <input type="text" class="form-control" id="Year" name="Year" value={car.Year} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-6">
              <label for="inputHand">יד</label>
              <input type="number" class="form-control" name="Hand" id="inputHand" value={car.Hand} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-6">
              <label for="inputCapacity">נפח</label>
              <input type="text" class="form-control" name="Capacity" id="inputCapacity" value={car.Capacity} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-6">
              <label for="inputKm">קילו</label>
              <input type="text" class="form-control" name="Km" id="inputKm" value={car.Km} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-6">
              <label for="inputPrice">מחיר</label>
              <input type="text" class="form-control" name="Price" id="inputPrice" value={car.Price} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-12">
              <label for="inputPrice">מספר רכב</label>
              <input type="text" class="form-control" name="carNumber" id="inputPrice" value={car.carNumber} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-12">
              <label for="inputNotes">הערות</label>
              <input type="text" class="form-control" name="Notes" id="Notes" value={car.Notes} onChange={handleInputChange} required />
            </div>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleUpdateModalClose}>סגור</Button>
              <Button variant="primary" type="submit" style={{ '--bs-btn-bg': '#1C5F8C', '--bs-btn-hover-bg': '#1C5F8C', '--bs-btn-border-Year': '#1C5F8C' }} >עדכן</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      {/* Sold Modal */}
      <Modal show={showSoldModal} onHide={handleSoldModalClose} animation={false} style={{ textAlign: 'right' }}>
        <Modal.Header closeButton>
          <Modal.Title>עדכו רכב לנמכר</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Message && <small style={{ color: 'green' }}>{Message}</small>}
          <form class="row" onSubmit={SoldCar}>
            <div class="form-group col-md-6">
              <label for="inputImg1">שם לקוח  </label>
              <input type="text" class="form-control" id="inputImg1" name="CustomerName" value={car.CustomerName} onChange={handleInputChange} required />
            </div>
            <div class="form-group col-md-6">
              <label for="inputImg1">תאריך העסקה  </label>
              <input type="date" class="form-control" id="inputImg1" name="SellingDate" value={car.SellingDate} onChange={handleInputChange} required />
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleSoldModalClose}>
                סגור
              </Button>
              <Button variant="primary" type="submit" style={{ '--bs-btn-bg': 'red', '--bs-btn-hover-bg': 'red', '--bs-btn-border-Year': 'red' }}>מכור</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      <h1>{car.Name}</h1><br />
      <div className="Body-container">
        <Carousel activeIndex={index} onSelect={handleSelect} style={{ width: '59%', textAlign: 'center' }}>
          <Carousel.Item>
            <img src={car.Img1} className='ImageSlider' />
          </Carousel.Item>
          <Carousel.Item>
            <img src={car.Img2} className='ImageSlider' />
          </Carousel.Item>
          <Carousel.Item>
            <img src={car.Img3} className='ImageSlider' />
          </Carousel.Item>
          <Carousel.Item>
            <img src={car.Img4} className='ImageSlider' />
          </Carousel.Item>
        </Carousel>
        <div className="informations">
          <div style={{ textAlign: 'right' }}>
            <span><b>שנה : </b>{car.Year}</span><br />
            <span><b> יד:</b> {car.Hand}</span><br />
            <span><b>נפח : </b>{car.Capacity}</span><br />
            <span><b> קילומ:</b> {car.Km}</span><br />
            <span><b>  כניסה למגרש:</b> {formatDate(car.EntranceDate)}</span><br />
            <span><b> מספר רכב:</b> {car.carNumber}</span><br />
            {car.isSold === true && (
              <>
                <span><b> שם הלקוח:</b> {car.CustomerName}</span><br />
                <span><b> SellingDate:</b> {formatDate(car.SellingDate)}</span><br />
              </>
            )}
            <span><b> מחיר:</b> <FontAwesomeIcon icon={faShekelSign} size="xs" />{car.Price} </span><br />
            <span><b> הערות:</b> {car.Notes}</span><br />
            <br />
            <div className='Buttons'>
              {car.isSold === false && (
                <>
                  <button className="Sold-button" onClick={handleSoldModalShow}>
                    <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: "#ffffff", }} /> מכור
                  </button>
                  <button className="Update-button" onClick={handleUpdateModalShow}>
                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff" }} /> עדכן
                  </button>
                </>
              )}
            </div>
            <button className="Delete-button" onClick={DeleteCar}>
              <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} /> מחק
            </button>
          </div>
        </div>
      </div>


    </>
  );
}