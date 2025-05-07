import fs from "fs";
import path from "path";

export const fetchRestaurants = () => {
  const filePath = path.join(process.cwd(), "./backend/data/restaurants.json");
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};
