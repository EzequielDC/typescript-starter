import { Module } from '@nestjs/common';
import { NestjsPaypalPayoutsModule } from 'nestjs-paypal-payouts';
import { PaypalController } from './paypal.controller';
import { PaypalService } from './paypal.service';
@Module({
    imports: [
      NestjsPaypalPayoutsModule.register({
        environment: 'sandbox', // process.env.PAYPAL_ENVIRONMENT as 'sandbox' | 'live',
        clientId: 'AXVMdDW7tlSfnaDE9fN0S15Rus4NzoyMAsCaGdEuWtdISUZZGr4RWwQIgmkBa22KeYNrsj90I_F9ZpSW', //process.env.PAYPAL_CLIENT_ID,
        clientSecret: 'EKEk7u2EPF4etlFwt1_Kst6RYbPSif8m1dTHCsSYY9LWCvIfOPGBTS_5bCr0zO78w0gkoASqh-nkfhWh'//process.env.PAYPAL_CLIENT_SECRET,
      }),
    ],
    controllers: [PaypalController],
    providers: [PaypalService],
})
export class PayPalModule {}