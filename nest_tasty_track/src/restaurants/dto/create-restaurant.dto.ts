import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  cuisine: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  rating?: number;
}
