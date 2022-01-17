import { Body, Controller, Get, Post, Param, Query, Res } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {

    constructor(private readonly paypalService: PaypalService) {}

    @Get()
    paypalCreate(@Res() res){

        return this.paypalService.createPayment(res);
    }
    
    @Get('execute-payment')
    paypalCapture(@Query() query){
        const {token, PayerID} = query;
        return this.paypalService.capture(token);
    }
    /*@Get()
    paypal(){
        return this.paypalService.payout();
    }

    @Get('procesar')
    paypalProcesar(@Query() query){

        const {bath_id} = query;
        console.log('Entro =>>', bath_id);
        return this.paypalService.procesar(bath_id);
    }

    @Get('item')
    getItem(@Query() query){

        const {item_id} = query;
        console.log('Entro =>>', item_id);
        return this.paypalService.getItem(item_id);
    }*/
}