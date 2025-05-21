/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
export interface Restaurant {
  id: number;
  name: string;
  location: string;
  cuisine: string;
  rating?: number;
}

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}
  // private restaurants: Restaurant[] = [];

  //example
  async getAllRestaurants() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.prisma.restaurant.findMany({
      select: {
        name: true,
        address: true,
        phone: true,
      },
    });
  }

  async create(createRestaurantDto: CreateRestaurantDto) {
    // DTO에서 Prisma 모델에 맞는 필드만 추출
    const { name, address, phone, rating } = createRestaurantDto as any;
    return await this.prisma.restaurant.create({
      data: { name, address, phone, rating },
    });
  }

  async findOne(id: number) {
    return await this.prisma.restaurant.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRestaurantDto: Partial<CreateRestaurantDto>) {
    return await this.prisma.restaurant.update({
      where: { id },
      data: updateRestaurantDto,
    });
  }

  async remove(id: number) {
    try {
      return await this.prisma.restaurant.delete({
        where: { id },
      });
    } catch (error) {
      // Prisma 에러 중 P2025 코드 (삭제할 레코드를 찾을 수 없을 때) 확인
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`ID가 ${id}인 곳을 찾을 수 없습니다.`);
      }
      // 그 외 다른 에러는 다시 발생시킴
      throw error;
    }
  }

  // findAll() {
  //   return this.restaurants;
  // }
}
