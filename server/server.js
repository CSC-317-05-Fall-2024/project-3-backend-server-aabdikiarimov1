import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import restaurantData, { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from './data/restaurants.js';
import bodyParser from 'body-parser';
import fs from 'fs';
import methodOverride from 'method-override';
import apiRouter from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/api', apiRouter);

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

app.get('/newform', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newform.html'));
});

// Render restaurant list
app.get('/restaurants', (req, res) => {
    res.render('restaurants', { restaurantData: getRestaurants() });
});

// Get restaurant by ID
app.get('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const restaurant = getRestaurant(id);

    if (restaurant) {
        res.render('restaurant-details', {
            name: restaurant.name,
            address: restaurant.address,
            phone: restaurant.phone,
            photo: restaurant.image
        });
    } else {
        res.status(404).send("Restaurant not found");
    }
});

// Add a new restaurant
app.post('/restaurants', (req, res) => {
    const newRestaurant = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        image: req.body.photo 
    };
    createRestaurant(newRestaurant); // Save the new restaurant
    res.redirect('/restaurants'); // Redirect to the restaurant list
});

// Delete a restaurant by ID
app.delete('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (deleteRestaurant(id)) {
        res.sendStatus(204); 
    } else {
        res.status(404).send("Restaurant not found.");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
