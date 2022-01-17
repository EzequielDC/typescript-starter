import { Module } from '@nestjs/common';
import { PruebaController } from './prueba.controller';
import { PruebaService } from './prueba.service';
import { DemoService } from 'src/demo/demo.service';

@Module({
  imports: [],
  controllers: [PruebaController],
  providers: [PruebaService, DemoService],
})
export class PruebaModule {}