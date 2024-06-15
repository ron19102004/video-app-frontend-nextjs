import { IRequest } from "@/interfaces";
import COOKIES_CONSTANT from "@/interfaces/cookies-constant.i";
import { Report } from "@/interfaces/report.i";
import { API, Http, IResponseLayout } from "@/lib/http";
import Cookies from "js-cookie";

export interface IReportController {
  pushReport(
    request: IRequest<{ email: string; content: string }, null, any>
  ): Promise<void>;
  getReportsChecked(): Promise<Array<Report>>;
  getReportsNotChecked(): Promise<Array<Report>>;
  handleReport(
    request: IRequest<{ id: number; reply: string }, null, any>
  ): Promise<void>;
}
export default class ReportController implements IReportController {
  private http: Http;
  private ReportURL = API.ReportURL;
  constructor(http: Http) {
    this.http = http;
  }
  async getReportsChecked(): Promise<Array<Report>> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    const response = await this.http.get<Array<Report>>(
      this.ReportURL.GET_REPORTS_CHECKED,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data ?? [];
  }
  async getReportsNotChecked(): Promise<Array<Report>> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    const response = await this.http.get<Array<Report>>(
      this.ReportURL.GET_REPORTS_CHECKED_YET,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data ?? [];
  }
  async handleReport(
    request: IRequest<{ id: number; reply: string }, null, any>
  ): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    const data = new FormData();
    data.append("reply", request.data.reply);
    const response = await this.http.post<IResponseLayout<null>>(
      this.ReportURL.HANDLE_REPORT(request.data.id),
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200 && response.data.status) {
      request.success(null);
    } else {
      request.error(response.data.message);
    }
  }
  async pushReport(
    request: IRequest<{ email: string; content: string }, null, any>
  ): Promise<void> {
    const response = await this.http.post<IResponseLayout<null>>(
      this.ReportURL.CREATE_REPORT,
      { email: request.data.email, content: request.data.content }
    );
    if (response.status === 200 && response.data.status) {
      request.success(null);
    } else {
      request.error(response.data.message);
    }
  }
}
