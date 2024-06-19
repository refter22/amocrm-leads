import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AmocrmClient } from './amocrm-client.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [AmocrmClient],
  exports: [AmocrmClient],
})
export class AmoCrmModule {}
