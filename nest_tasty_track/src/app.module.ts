import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CatsModule, RestaurantsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
