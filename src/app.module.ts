import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PruebaModule } from './prueba/prueba.module';
import { DemoModule } from './demo/demo.module';
import { PayPalModule } from './paypal/paypal.module';

@Module({
  imports: [PruebaModule, DemoModule, PayPalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}