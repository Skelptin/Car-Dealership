

import { getDb } from '../config/db.js';

export const addDeal = async (req, res, next) => {
  try {
    const { dealershipId } = req.user;
    const dealData = req.body;

    const db = getDb();
    const result = await db.collection('deals').insertOne({ ...dealData, dealershipId });
    res.status(201).json({ message: 'Deal added successfully', dealId: result.insertedId });
  } catch (error) {
    next(error);
  }
};

export const addCarToDealership = async (req, res, next) => {
  try {
    const { dealershipId } = req.user;
    const carData = req.body;

    const db = getDb();
    const result = await db.collection('cars').insertOne({ ...carData, dealershipId });
    res.status(201).json({ message: 'Car added to dealership successfully', carId: result.insertedId });
  } catch (error) {
    next(error);
  }
};

export const getDealershipCars = async (req, res, next) => {
  try {
    const { dealershipId } = req.user;
    const db = getDb();
    const cars = await db.collection('cars').find({ dealershipId }).toArray();
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

export const getDealershipDeals = async (req, res, next) => {
  try {
    const { dealershipId } = req.user; // Assuming dealership ID is stored in JWT payload
    const db = getDb();
    const deals = await db.collection('deals').find({ dealershipId }).toArray();
    res.json(deals);
  } catch (error) {
    next(error);
  }
};
