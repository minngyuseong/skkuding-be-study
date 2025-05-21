import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  rating?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date) // 클라이언트에서 온 문자열 날짜를 Date 객체로 변환
  createdAt?: Date; // createdAt 필드 추가 (선택 사항)
}
