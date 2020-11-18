import { PartialType } from "@nestjs/swagger";
import { CreateCoffeeDto } from "./create-coffee.dto";


//npm i @nestjs/mapped-types
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}