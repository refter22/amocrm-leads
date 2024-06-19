import { Controller, Get, Query, Render } from '@nestjs/common';
import { LeadsService } from '../leads/leads.service';

@Controller()
export class ViewController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  @Render('leads')
  async getLeads(@Query('query') query?: string) {
    const leads = await this.leadsService.getLeads(query);
    return { leads, query };
  }
}
