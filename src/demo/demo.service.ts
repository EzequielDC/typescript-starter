import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoService {
    
    fnSaludar(){

        console.log('Llamado');
        return {
            saludo: 'Hola desde demo'
        };
    }
}