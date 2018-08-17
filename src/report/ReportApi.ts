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

  public async listReports(): Promise<fromRoot.WolkResponse<fromModels.ReportShortDto[]>> {
    try {
      const reportList = await this.client.request(
        'GET',
        '/api/reports'
      );
      return reportList;
    } catch (error) {
      throw error;
    }
  }

  public async getReportByFeed(params: { feedIds?: number[], from?: number, to?: number } = {}):
    Promise<fromRoot.WolkResponse<fromModels.FeedReport[]>> {
    const { from, to, feedIds = [] } = params;

    const requestConfig: AxiosRequestConfig = {
      params: {
        from,
        to,
        feedIds: feedIds.join(','),
      },
      headers: {
        Accept: 'APPLICATION/VND.FEEDREPORT+JSON'
      }
    };

    try {
      const reportList = await this.client.request(
        'GET',
        '/api/reports',
        requestConfig
      );
      return reportList;
    } catch (error) {
      throw error;
    }
  }

  public async getDataSnapshot(params: { feedIds: number[], from?: number, to?: number }):
    Promise<fromRoot.WolkResponse<fromModels.DataSnapshot>> {
    const { from, to, feedIds = [] } = params;

    const requestConfig: AxiosRequestConfig = {
      params: {
        from,
        to,
        feedIds: feedIds.join(','),
      },
      headers: {
        Accept: 'APPLICATION/VND.SNAPSHOT.WITH.INTERVAL.V2+JSON'
      }
    };

    try {
      const reportList = await this.client.request(
        'GET',
        '/api/reports/snapshotForFeeds',
        requestConfig
      );
      return reportList;
    } catch (error) {
      throw error;
    }
  }

  public async getReport(reportId: number): Promise<fromRoot.WolkResponse<fromModels.ReportDto>> {
    try {
      const reportList = await this.client.request(
        'GET',
        `/api/reports/${reportId}`,
      );
      return reportList;
    } catch (error) {
      throw error;
    }
  }

}
