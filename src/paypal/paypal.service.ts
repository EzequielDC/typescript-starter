import { Injectable } from '@nestjs/common';
import {InjectPaypal, InjectPaypalClient} from 'nestjs-paypal-payouts'
import axios from 'axios';

@Injectable()
export class PaypalService{

    CLIENT = 'AXVMdDW7tlSfnaDE9fN0S15Rus4NzoyMAsCaGdEuWtdISUZZGr4RWwQIgmkBa22KeYNrsj90I_F9ZpSW';
    SECRET = 'EKEk7u2EPF4etlFwt1_Kst6RYbPSif8m1dTHCsSYY9LWCvIfOPGBTS_5bCr0zO78w0gkoASqh-nkfhWh';
    PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com
    auth = { username: this.CLIENT, password: this.SECRET };

    constructor(
        @InjectPaypalClient()
        private readonly paypalClient,
        @InjectPaypal()
        private readonly paypal,
    ) {}

    async createPayment(res) {

        const body = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                    value: '115'
                }
            }],
            application_context: {
                brand_name: `demo.com`,
                landing_page: 'NO_PREFERENCE',
                user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
                return_url: `http://localhost:3000/paypal/execute-payment`, // Url despues de realizar el pago
                cancel_url: `http://localhost:3000/paypal/cancel-payment` // Url despues de realizar el pago
            }
        }
        
        const conf = {
            auth: this.auth
        };

        let instance = axios.create({
            auth: this.auth,
            responseType: 'json'
        });
        let response = await instance.post(`${this.PAYPAL_API}/v2/checkout/orders`, body);
        let link = response.data.links.filter(item => item.rel === 'approve');
        if(link.length > 0){

            link = link[0].href;
            res.status(302).redirect(link);
        }
        // approve

        return response.data;
    }

    async capture(token){

        const instance = axios.create({
            auth: this.auth,
            responseType: 'json'
        });
        
        const response = await instance.post(`${this.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {});
        console.log('Nuevo', response.data);
        return response.data;
    }
     
    async payout() {
      let request = new this.paypal.payouts.PayoutsPostRequest();
     
      request.requestBody({
        sender_batch_header: {
          recipient_type: "EMAIL", //"sb-3iqsj1353691@business.example.com",
          email_message: "SDK payouts test txn",
          note: "Enjoy your Payout!!",
          sender_batch_id: "demo_8",
          email_subject: "This is a test transaction from SDK"
        },
        items: [{
          note: "Your 5$ Payout!",
          amount: {
            currency: "USD",
            value: "1.00"
          },
          receiver: "sb-2yhby259707@business.example.com",
          sender_item_id: "demo_1"
        }]
      });
     
      let response = await this.paypalClient.execute(request);

    //   console.log(`Response: ${JSON.stringify(response)}`);
    //   console.log('\n');
      // If call returns body in response, you can get the deserialized version from the result attribute of the response.
      console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);

    //   // demo 2
    //   request = new this.paypal.payouts.PayoutsPostRequest();
    //   request.requestBody(JSON.stringify(response.result));
    //   response = await this.paypalClient.execute(request);
    //   console.log(`\n\n >>>> Payouts Create Response: ${JSON.stringify(response)}`);
    //   // demo 2

      return response.result;
    }

    async procesar(batchId){

        let request = new this.paypal.payouts.PayoutsGetRequest(batchId);
        // request.page(1);
        // request.pageSize(10);
        // request.totalRequired(true);
        // Call API with your client and get a response for your call
        let response = await this.paypalClient.execute(request);
        // console.log(`Response: ${JSON.stringify(response)}`);
        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
        console.log(`Payouts procesar: ${JSON.stringify(response.result)}`);

        return response.result;
    }

    async getItem(item){

        console.log('>>> Ok >>> ',this.paypal);
        let request = new this.paypal.payouts.PayoutsItemGetRequest(item);
        let response = await this.paypalClient.execute(request);

        console.log(`Prueba: ${JSON.stringify(response.result)}`);

        return response;
    }
}