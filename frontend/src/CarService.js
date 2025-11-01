import axios from "axios";
const API ="http://localhost:8000/cars"

axios.defaults.withCredentials = true;

export async function fetchAllCars() {
  const response = await axios.get(`${API}`);
  return response.data;
}

export const getCarById = async (id) => {
  try {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
  } catch (error) {
    console.error("get Car BY ID " + error);
  }
};

export async function addCar(car) {
const searchCar = await axios.get(`${API}/carNumber/${car.carNumber}`);
if (searchCar.data && searchCar.data.isSold) {
  console.log("the car already exist in the sold cars");
  return -1;
}
else if (searchCar.data && !searchCar.data.isSold) {
  console.log("the car already exist.");
  return false;
}
else {
const newCar={
  carNumber:car.carNumber,
  Name:car.Name,
  Year:car.Year,
  Hand:car.Hand,
  Capacity:car.Capacity,
  EntranceDate:car.EntranceDate,
  isSold:car.isSold,
  CustomerName:car.CustomerName,
  SellingDate:car.SellingDate,
  Notes:car.Notes,
  Img1:car.Img1,
  Img2:car.Img2,
  Img3:car.Img3,
  Img4:car.Img4,
  Price:car.Price,
  Km:car.Km
};
  const response = await axios.post(`${API}`, newCar);
  return response.data;
}
}

export async function uploadImage(image) {
  const formData = new FormData();
  formData.append('image', image);
    const result = await axios.post(`${API}/getImg`,formData);
    return result.data.secure_url;
};

export const updateCarById = async (id, carData) => {
  try {
    const response = await axios.put(`${API}/${id}`, carData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCarById = async (id) => {
  try {
    const response = await axios.delete(`${API}/${id}`);
    return response;
  } 
  catch (error) {
    console.error("Delete Car BY ID error : " + error);
    return error;
  }
};


export const markCarAsSold = async (id, carData) => {
  try {
    const response = await axios.put(`${API}/${id}`, { ...carData, isSold: true });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateIsSold_toFalse = async (car) => {
  try {
    const searchCar = await axios.get(`${API}/carNumber/${car.carNumber}`);
    const carData = searchCar.data;
      carData.isSold = false;
      carData.Hand = car.Hand;
      carData.EntranceDate = car.EntranceDate;
      carData.CustomerName = "";
      carData.SellingDate = "";
      carData.Notes = car.Notes;
      carData.Price = car.Price;
      carData.Km = car.Km;
      const response =await axios.put(`${API}/${carData._id}`,carData);
      return response.data;

  }
  catch (error) {
    console.error(error);
    return false;
  }
};












