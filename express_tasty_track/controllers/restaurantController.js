import { fetchRestaurants } from "../services/restaurantService.js";
import fs from "fs";
const filePath = "./backend/data/restaurants.json";

export const getAllRestaurants = (req, res) => {
  const data = fetchRestaurants();
  res.json(data);
};

export const createRestaurant = (req, res) => {
  const { name, location, cuisine } = req.body;
  const newRestaurant = { id: Date.now(), name, location, cuisine };
  const data = fetchRestaurants();
  // data.push(newRestaurant);
  fs.writeFileSync(filePath, JSON.stringify(data));
  res.status(201).json(newRestaurant);
};
export const updateRestaurant = (req, res) => {
  const { id, name, location, cuisine } = req.body;
  const data = fetchRestaurants();
  const restaurantIndex = data.findIndex(
    (restaurant) => restaurant.id === parseInt(id),
  );
  if (restaurantIndex !== -1) {
    data[restaurantIndex] = { id: parseInt(id), name, location, cuisine };
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.json(data[restaurantIndex]);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
};
export const deleteRestaurant = (req, res) => {
  const { id } = req.body;
  const data = fetchRestaurants();
  const restaurantIndex = data.findIndex(
    (restaurant) => restaurant.id === parseInt(id),
  );
  if (restaurantIndex !== -1) {
    data.splice(restaurantIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
};
export const getRestaurantById = (req, res) => {
  const { id } = req.params;
  const data = fetchRestaurants();
  const restaurant = data.restaurants.find(
    (restaurant) => restaurant.id === parseInt(id),
  );
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
};
