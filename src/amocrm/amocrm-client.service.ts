import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AppConfig, AmoCrmConfig } from '../config/configuration';

@Injectable()
export class AmocrmClient {
  private accessToken: string;
  private refreshToken: string;
  private readonly amocrmConfig: AmoCrmConfig;

  private readonly amocrmUrl: string;
  private readonly longLifeToken: string;

  constructor(
    private configService: ConfigService<AppConfig>,
    private httpService: HttpService,
  ) {
    this.amocrmConfig = this.configService.get<AmoCrmConfig>('amocrm');
    this.amocrmUrl = this.amocrmConfig.url;
    this.longLifeToken = this.amocrmConfig.longLifeToken;
  }

  private async sendRequest(
    url: string,
    method: 'get' | 'post' | 'put' | 'delete',
    data?: any,
  ): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method,
          url: `${this.amocrmUrl}${url}`,
          headers: {
            Authorization: `Bearer ${this.longLifeToken}`,
          },
          data,
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Error during request:', error);
      throw error;
    }
  }

  public async fetchLeads(query?: string): Promise<any[]> {
    let url = '/api/v4/leads';
    if (query) {
      url += `?query=${query}`;
    }

    const response = await this.sendRequest(url, 'get');
    return response?._embedded?.leads || [];
  }

  public async fetchUserById(id: number): Promise<any> {
    const response = await this.sendRequest(`/api/v4/users/${id}`, 'get');
    return response;
  }

  public async fetchLeadStatus(
    pipelineId: number,
    statusId: number,
  ): Promise<any> {
    const response = await this.sendRequest(
      `/api/v4/leads/pipelines/${pipelineId}/statuses/${statusId}`,
      'get',
    );
    return response;
  }
}
