import { Module } from '@nestjs/common';
import { LeadsModule } from '../leads/leads.module';
import { ViewController } from './view.controller';

@Module({
  imports: [LeadsModule],
  controllers: [ViewController],
})
export class ViewModule {}
