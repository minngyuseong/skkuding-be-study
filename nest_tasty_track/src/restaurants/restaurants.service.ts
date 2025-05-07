import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  cuisine: string;
  rating?: number;
}

@Injectable()
export class RestaurantsService {
  private restaurants: Restaurant[] = [];

  create(createRestaurantDto: CreateRestaurantDto) {
    const newRestaurant: Restaurant = {
      id: this.restaurants.length + 1,
      ...createRestaurantDto,
    };
    this.restaurants.push(newRestaurant);
    return newRestaurant;
  }

  findAll() {
    return this.restaurants;
  }

  findOne(id: number) {
    return (
      this.restaurants.find((restaurant) => restaurant.id === id) ||
      'Restaurant not found'
    );
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const index = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id,
    );
    if (index === -1) return 'Restaurant not found';

    this.restaurants[index] = {
      ...this.restaurants[index],
      ...updateRestaurantDto,
    };
    return this.restaurants[index];
  }

  remove(id: number) {
    const index = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id,
    );
    if (index === -1) return 'Restaurant not found';

    const deleted = this.restaurants.splice(index, 1);
    return deleted[0];
  }
}
