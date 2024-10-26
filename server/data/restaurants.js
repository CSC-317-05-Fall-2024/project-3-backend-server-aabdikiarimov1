let restaurantData = [
    {
        "id": 0,
        "name": "Lazy Bear",
        "address": "3416 19th St, San Francisco, CA 94110",
        "phone": "(415) 123 - 4567",
        "image": "images/restaurant1.jpg"
      },
      {
        "id": 1,
        "name": "Hog Island Oyster",
        "address": "1 Ferry Bldg, Ste 11, San Francisco, CA 94111",
        "phone": "(415) 123 - 4567",
        "image": "images/restaurant2.jpg"
      },
      {
        "id": 2,
        "name": "Gary Danko",
        "address": "800 North Point st, San Francisco, CA 94109",
        "phone": "(415) 123 - 4567",
        "image": "images/restaurant3.jpg"
      },
      {
        "id": 3,
        "name": "Brenda's French Soul Food",
        "address": "652 Polk St, San Francisco, CA 94102",
        "phone": "(415) 123 - 4567",
        "image": "images/restaurant4.jpg"
      },
      {
        "id": 4,
        "name": "Kokkari Estiatorio",
        "address": "200 Jackson St, San Francisco, CA 94111",
        "phone": "(415) 123 - 4567",
        "image": "images/restaurant5.jpg"
      },
      {
        "id": 5,
        "name": "San Tung",
        "address": "1031 Irving St, San Francisco, CA 94122",
        "phone": "(415) 123 - 4567",
        "image": "images/restaurant6.jpg"
      },
      {
        "id": 6,
        "name": "Sons & Daughters",
        "phone": "(415) 994-7933",
        "address": "Between Mason &, 708 Bush Street, Powell St, San Francisco, CA 94108",
        "image": "https://lh3.googleusercontent.com/p/AF1QipNRYiS7YxotMX2h8WD4H6CUtoWsugV6xqILjtKQ=s1360-w1360-h1020"
      }
];

let lastId = restaurantData.length;

const getNextId = () => {
    lastId += 1;
    return lastId;
}

// Get all restaurants
const getRestaurants = () => restaurantData;

// Get a restaurant by id
const getRestaurant = (id) => restaurantData.find(restaurant => restaurant.id === id);

// Create a new restaurant entry
const createRestaurant = (newRestaurant) => {
  const restaurant = { id: getNextId(), ...newRestaurant };
  restaurantData.push(restaurant);
  return restaurant;
};


// Delete a restaurant by id
const deleteRestaurant = (id) => {
  const index = restaurantData.findIndex(restaurant => restaurant.id === id);
  if (index !== -1) {
      restaurantData.splice(index, 1);
      return true; // Deletion was successful
  }
  return false; // Restaurant not found
};

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant };
export default restaurantData;