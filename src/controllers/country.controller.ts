import { IRequest } from "@/interfaces";
import COOKIES_CONSTANT from "@/interfaces/cookies-constant.i";
import { Country } from "@/interfaces/country.i";
import { API, Http, IResponseLayout } from "@/lib/http";
import Cookies from "js-cookie";
export interface ICountryController {
  getCountries(): Promise<Array<Country>>;
  create(request: IRequest<{ name: string }, null, any>): Promise<void>;
  update(
    request: IRequest<{ id: number; name: string }, null, any>
  ): Promise<void>;
  delete(request: IRequest<{ id: number }, null, any>): Promise<void>;
}
export default class CountryController implements ICountryController {
  private CountryURL = API.CountryURL;
  private http: Http;
  constructor(http: Http) {
    this.http = http;
  }
  async getCountries(): Promise<Array<Country>> {
    return (await this.http.get<Array<Country>>(this.CountryURL.GET_COUNTRIES))
      .data;
  }
  async create(request: IRequest<{ name: string }, null, any>): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!accessToken) {
      request.error("Access token not found");
      return;
    }
    await this.http
      .post<IResponseLayout<null>>(this.CountryURL.CREATE, request.data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.status) {
          request.success(null);
        } else {
          request.error(response.data.message);
        }
      })
      .catch((err) => request.error(err));
  }
  async update(
    request: IRequest<{ id: number; name: string }, null, any>
  ): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!accessToken) {
      request.error("Access token not found");
      return;
    }
    await this.http
      .patch<IResponseLayout<null>>(
        this.CountryURL.UPDATE(request.data.id),
        { name: request.data.name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data.status) {
          request.success(null);
        } else {
          request.error(response.data.message);
        }
      })
      .catch((err) => request.error(err));
  }
  async delete(request: IRequest<{ id: number }, null, any>): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!accessToken) {
      request.error("Access token not found");
      return;
    }
    await this.http
      .delete<IResponseLayout<null>>(this.CountryURL.DELETE(request.data.id), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.status) {
          request.success(null);
        } else {
          request.error(response.data.message);
        }
      })
      .catch((err) => request.error(err));
  }
}
