import express from "express";
import {
  getAllRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantById,
} from "../controllers/restaurantController.js";

const restaurantsRouter = express.Router();

restaurantsRouter.post("/create", createRestaurant);
restaurantsRouter.post("/update", updateRestaurant);
restaurantsRouter.post("/delete", deleteRestaurant);
restaurantsRouter.get("/get/:id", getRestaurantById);
restaurantsRouter.get("/get", getAllRestaurants);

export default restaurantsRouter;
