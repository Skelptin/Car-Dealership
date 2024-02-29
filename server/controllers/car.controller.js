// car.controller.js

import { getDb } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const addCarToSell = async (req, res, next) => {
  try {
    const carData = req.body;
    const db = getDb();
    const result = await db.collection('inventory').insertOne(carData);
    res.status(201).json({ message: 'Car added to inventory for selling', carId: result.insertedId });
  } catch (error) {
    next(error);
  }
};

export const getAllCars = async (req, res, next) => {
  
  try {
    const db = getDb();
    const cars = await db.collection('inventory').find({}).toArray();
    console.log('cars' ,cars)
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

export const getCars = async (req, res, next) => {
  try {
    const dealerId = req.params.dealerId;
    const db = getDb();
    const cars = await db.collection('inventory').find({ dealerId: dealerId }).toArray();
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

export const editCarDetails = async (req, res, next) => {
  try {
    const carId = req.params.carId;
    const updatedData = req.body;
    const db = getDb();
    const result = await db.collection('inventory').updateOne({ _id: carId }, { $set: updatedData });
    res.status(200).json({ message: 'Car details updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const carId = req.params.carId;
    const objectIdCarId = new ObjectId(carId); 
    console.log(carId) 
    const db = getDb();
    const result = await db.collection('inventory').deleteOne({_id: objectIdCarId });
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    next(error);
  }
};

