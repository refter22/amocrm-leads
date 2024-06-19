import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration, { validationSchema } from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import { AmoCrmModule } from './amocrm/amocrm.module';
import { LeadsModule } from './leads/leads.module';
import { ViewController } from './view/view.controller';
import { ViewModule } from './view/view.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    HttpModule,
    AmoCrmModule,
    LeadsModule,
    ViewModule,
  ],
  controllers: [ViewController],
})
export class AppModule {}
