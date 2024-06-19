import { Injectable } from '@nestjs/common';
import { AmocrmClient } from '../amocrm/amocrm-client.service';
import Lead from './types/lead.type';

@Injectable()
export class LeadsService {
  constructor(private readonly amocrmClient: AmocrmClient) {}

  async getLeads(query?: string): Promise<Lead[]> {
    const amocrm_leads = await this.amocrmClient.fetchLeads(query);
    const leads = [];
    for (const amocrm_lead of amocrm_leads) {
      const amocrm_user = await this.amocrmClient.fetchUserById(
        amocrm_lead.responsible_user_id,
      );
      const amocrm_status = await this.amocrmClient.fetchLeadStatus(
        amocrm_lead.pipeline_id,
        amocrm_lead.status_id,
      );

      const lead: Lead = {
        id: amocrm_lead.id,
        name: amocrm_lead.name,
        budget: amocrm_lead.price,
        status: amocrm_status.name,
        created_at: amocrm_lead.created_at,
        responsible_user: amocrm_user.name,
      };

      leads.push(lead);
    }
    return leads;
  }
}
