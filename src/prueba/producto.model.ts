export class Producto{

    id: string;
    titulo: string;
    descripcion: string;
    precio: number;

    constructor(id: string, titulo: string, descripcion: string, precio: number){
        
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}