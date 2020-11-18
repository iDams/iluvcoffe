import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';


//factory
export class CoffeBrandsFactory {
  create(){
    return ['buddy brew', 'nescafe'];
  }
}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule.forFeature(coffeesConfig)], //para config interna
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeBrandsFactory,
    {
      provide: COFFEE_BRANDS, // 👈
      useFactory: (brandsFactory: CoffeBrandsFactory) =>
        brandsFactory.create(), // array of coffee brands,
      inject:[CoffeBrandsFactory],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
