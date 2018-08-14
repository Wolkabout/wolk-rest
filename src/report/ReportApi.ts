import { AxiosRequestConfig } from 'axios';
import Client from '../Client';
import * as fromRoot from '../model';
import * as fromModels from './model';

export default class ReportApi {
  constructor(private readonly client: Client) { }

  /**
   * Function that should create report and return it's newly created Id.
   * @param {fromModels.ReportDto} reportDto
   */
  public async createReport(reportDto: fromModels.ReportDto): Promise<fromRoot.WolkResponse<number>> {
    const requestConfig: AxiosRequestConfig = {
      data: reportDto
    };

    try {
      const response = await this.client.request(
        'POST',
        '/api/reports',
        requestConfig
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   *  Delete the report with given id
   * @param {number} reportId
   */
  public async deleteReport(reportId: number): Promise<fromRoot.WolkResponse<any>> {

    try {
      const response = await this.client.request(
        'DELETE',
        `/api/reports/${reportId}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

}
