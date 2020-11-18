import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService,
    // @Inject(REQUEST) private readonly request: Request,
    ) {
    console.log('coffeeController created');
  }

  // @Get('old')
  // findAllOld() {
  //   return 'this action returns all coffees';
  // }

  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  /* short-hand versions are available as well */
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public()
  @Get()
  async findAll(@Protocol() protocol: string,
    @Query() paginationQuery) {
      console.log(protocol);
    await new Promise(resolve => setTimeout(resolve, 2000));
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
    return this.coffeesService.findOne(id);
  }

  @Post()
//   @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
