import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats = ['Luna', 'Bella', 'Charlie'];

  findAll(): string[] {
    return this.cats;
  }

  findOne(id: number): string {
    return this.cats[id] || 'Cat not found';
  }

  addCat(name: string): void {
    this.cats.push(name);
  }
}
