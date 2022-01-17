import { Injectable } from '@nestjs/common';
import { Producto } from './producto.model';
// import uuid from 'uuid/dist/v4'

@Injectable()
export class PruebaService {
  
    productos: Producto[] = [];

    insertarProducto(titulo: string, descripcion: string, precio: number){

        const json = {
            error   : 0,
            msj     : '',
            producto : ''
        };

        const id = '1'; //uuid();
        const nuevoProducto = new Producto(id, titulo, descripcion, precio);
        this.productos.push(nuevoProducto);

        json.msj = 'Agregado satifactoriamente';
        json.producto = titulo;

        return json;
    }

    getTodo(){

        return this.productos;
    }

    getProducto(id : string){

        const producto = this.productos.find((prod => prod.id === id));
        if(!producto){
            return {}
        }

        return { ...producto };
    }
}
