import express from 'express';
import { createRestaurant, deleteRestaurant, getRestaurants, getRestaurant } from '../data/restaurants.js';

const router = express.Router();

// Create a new restaurant
router.post('/restaurants', (req, res) => {
    const newRestaurant = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        image: req.body.photo || "images/default-restaurant.jpg"
    };
    
    const createdRestaurant = createRestaurant(newRestaurant);
    res.status(201).json(createdRestaurant);
});

// Delete a restaurant by ID
router.delete('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const deleted = deleteRestaurant(id);

    if (deleted) {
        res.status(204).send(); 
    } else {
        res.status(404).json({ message: "Restaurant not found." });
    }
});

// Get all restaurants
router.get('/restaurants', (req, res) => {
    res.json(getRestaurants());
});

// Get a restaurant by ID
router.get('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const restaurant = getRestaurant(id);

    if (restaurant) {
        res.json(restaurant); // Return the found restaurant
    } else {
        res.status(404).json({ message: "Restaurant not found." });
    }
});

export default router;
