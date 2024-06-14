import COOKIES_CONSTANT from "@/interfaces/cookies-constant.i";
import { User } from "@/interfaces/user.i";
import { API, Http, IResponseLayout } from "@/lib/http";
import Cookies from "js-cookie";

export interface IResponseUserConfirmed {
  isSubscribing: boolean;
  user: User | null;
}
export interface IUserController {
  getUserConfirmed(userId: number | string): Promise<IResponseUserConfirmed>;
}
export default class UserController implements IUserController {
  private UserURL = API.UserURL
  private http: Http;
  constructor(http: Http) {
    this.http = http;
  }
  async getUserConfirmed(
    userId: number | string
  ): Promise<IResponseUserConfirmed> {
    const token = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    const response = await this.http.get<IResponseLayout<any>>(
      token === undefined
        ? this.UserURL.GET_USER_CONFIRMED(false, userId)
        : this.UserURL.GET_USER_CONFIRMED(true, userId),
      token === undefined
        ? {}
        : {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    );
    if (response.status === 200) {
      if (token !== undefined) {
        return response.data.data;
      }
      return {
        isSubscribing: false,
        user: response.data.data,
      };
    }
    return {
      isSubscribing: false,
      user: null,
    };
  }
}
