import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): string[] {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.catsService.findOne(Number(id));
  }

  @Post()
  addCat(@Body('name') name: string): string {
    this.catsService.addCat(name);
    return `Added cat: ${name}`;
  }
}
