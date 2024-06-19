import { Controller, Get, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  async getLeads(@Query('query') query: string) {
    const leads = await this.leadsService.getLeads(query);
    return leads;
  }
}
