import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { PruebaService } from './prueba.service';
import { DemoService } from 'src/demo/demo.service';

@Controller('prueba')
export class PruebaController {
    constructor(
        private readonly pruebaService: PruebaService,
        private readonly demoService: DemoService
        ) {}

    @Get()
    mostrar()  {
        return 'Probar el producto';
    }

    @Get('demo')
    mostrar2(): string {
        return 'Sub controller';
    }

    @Get('ok')
    getServicio(){

        return this.demoService.fnSaludar();
    }

    @Get('todo')
    getTodo(@Param('id') id : {}): {} {
        
        return this.pruebaService.getTodo();
    }

    @Get(':id')
    getProducto(@Param('id') id : string): {} {
        
        return this.pruebaService.getProducto(id);
    }

    @Post()
    addProducto(
        @Body('titulo') titulo : string,
        @Body('descripcion') descripcion : string,
        @Body('precio') precio : number
    ){
        
        const producto = this.pruebaService.insertarProducto(titulo, descripcion, precio);
        
        return producto;
    }

}