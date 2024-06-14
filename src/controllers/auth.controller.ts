import COOKIES_CONSTANT from "@/interfaces/cookies-constant.i";
import { LoginRequest, RegisterRequest, User, Vip } from "@/interfaces/user.i";
import { API, Http, IResponseLayout } from "@/lib/http";
import Cookies from "js-cookie";

export interface IDataCheckAuthentication {
  user: User;
  vip: Vip;
}
export interface IAuthController {
  login<T>(
    request: LoginRequest,
    success: (data: T) => void,
    error: (err: any) => void
  ): Promise<void>;
  register<T>(
    request: RegisterRequest,
    success: (data: T) => void,
    error: (err: any) => void
  ): Promise<void>;
  checkAuthentication(
    success: (data: IDataCheckAuthentication) => void,
    error: (err: any) => void
  ): void;
}
export default class AuthController implements IAuthController {
  private AuthURL = API.AuthURL;
  private http: Http;
  private FALSE: string = "false";
  constructor(http: Http) {
    this.http = http;
  }
  async login<T>(
    request: LoginRequest,
    success: (data: T | any) => void,
    error: (err: any) => void
  ): Promise<void> {
    try {
      const response = await this.http.post(this.AuthURL.LOGIN, request);
      if (response.status === 200 && response.data) {
        success(response.data);
      }
    } catch (err) {
      error(err);
    }
  }
  async register<T>(
    request: RegisterRequest,
    success: (data: T | any) => void,
    error: (err: any) => void
  ): Promise<void> {
    try {
      const response = await this.http.post(this.AuthURL.REGISTER, request);
      if (response.status === 200 && response.data) {
        success(response.data);
      }
    } catch (err) {
      error(err);
    }
  }
  checkAuthentication(
    success: (data: IDataCheckAuthentication) => void,
    error: (err: any) => void
  ): void {
    const isAuthenticated: string =
      Cookies.get(COOKIES_CONSTANT.IS_AUTHENTICATED) ?? this.FALSE;
    if (isAuthenticated === this.FALSE) {
      return;
    }
    const accessToken: string | undefined = Cookies.get(
      COOKIES_CONSTANT.ACCESS_TOKEN
    );
    if (accessToken === undefined) {
      return;
    }
    this.http
      .get<IResponseLayout<IDataCheckAuthentication>>(
        this.AuthURL.CHECK_AUTHENTICATION,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data.status) {
          const data: IDataCheckAuthentication | null = response.data.data;
          if (data !== null) {
            success(data);
          }
        } else {
          Cookies.remove(COOKIES_CONSTANT.ACCESS_TOKEN);
          Cookies.remove(COOKIES_CONSTANT.IS_AUTHENTICATED);
        }
      })
      .catch((err) => {
        error(err);
      });
  }
}
