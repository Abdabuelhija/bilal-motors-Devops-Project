// cars.route.js
const express = require("express");
const CarRoute = express.Router();
const Car = require("../models/Car");
const cloudinary = require('../services/cloudinaryConfig');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../services/config");

function isAuthenticated(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
  
    try {
      const decoded = jwt.verify(token,config.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  }

CarRoute.post("/getImg", upload.single('image'), async (req, res) => {
    try {
        let imageContent = {
            value: Buffer.from(req.file.buffer).toString('base64'),
            options: {
                filename: req.file.originalname,
                contentType: req.file.mimetype
            }
        };

        const imgUrl = await cloudinary.uploader.upload(imageContent);
        res.status(200).send(imgUrl);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a Car by id
CarRoute.delete("/:id", async (req, res) => {
    try {
        let car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).send({ message: 'Car not found' });
        }
        await cloudinary.uploader.destroy(car.Img1);
        await cloudinary.uploader.destroy(car.Img2);
        await cloudinary.uploader.destroy(car.Img3);
        await cloudinary.uploader.destroy(car.Img4);

        await Car.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Car deleted successfully' });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// Create a new Car
CarRoute.post("/", async (req, res) => {
    let car = new Car(req.body);
    try {
        let savedCar = await car.save();
        res.status(200).send(savedCar);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// Get all Cars
CarRoute.get("/",isAuthenticated, async (req, res) => {
    let cars = await Car.find({});
    res.status(200).send(cars);
});

// Get a Car by Id
CarRoute.get("/:id", async (req, res) => {
    try {
        let car = await Car.findById(req.params.id);
        res.status(200).send(car);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// Update a Car by id
CarRoute.put("/:id", async (req, res) => {
    try {
        let car = await Car.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.status(200).send(car);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a Car by carNumber
CarRoute.get("/carNumber/:carNumber", async (req, res) => {
    try {
        let car = await Car.findOne({ carNumber: req.params.carNumber });
        res.status(200).send(car);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = CarRoute;
