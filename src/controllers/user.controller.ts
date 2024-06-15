import { IRequest } from "@/interfaces";
import COOKIES_CONSTANT from "@/interfaces/cookies-constant.i";
import { SubscribeInfo, User } from "@/interfaces/user.i";
import { API, Http, IResponseLayout } from "@/lib/http";
import Cookies from "js-cookie";

export interface IResponseUserConfirmed {
  isSubscribing: boolean;
  user: User | null;
}
export interface IUserController {
  getUserConfirmed(userId: number | string): Promise<IResponseUserConfirmed>;
  subscribe(
    request: IRequest<{ subscriberId: number | string }, null, any>
  ): Promise<void>;
  unsubscribe(
    request: IRequest<{ un_subscriberId: number | string }, null, any>
  ): Promise<void>;
  confirmUser(
    request: IRequest<{ username: string }, null, any>
  ): Promise<void>;
  getSubscribeUser(userId: number): Promise<SubscribeInfo>;
}
export default class UserController implements IUserController {
  private UserURL = API.UserURL;
  private http: Http;
  constructor(http: Http) {
    this.http = http;
  }
  async getSubscribeUser(userId: number): Promise<SubscribeInfo> {
    const response = await this.http.get<IResponseLayout<SubscribeInfo>>(
      this.UserURL.GET_SUBSCRIBE_USER(userId)
    );
    return (
      response.data.data ?? {
        subscribed: 0,
        subscribing: 0,
      }
    );
  }
  async confirmUser(
    request: IRequest<{ username: string }, null, any>
  ): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!accessToken) {
      request.error("Please login to confirm user");
      return;
    }
    await this.http
      .post<IResponseLayout<null>>(
        this.UserURL.CONFIRM_USER(request.data.username),
        null,
        {
          headers: {
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
      .catch((error) => {
        request.error(error);
      });
  }
  async subscribe(
    request: IRequest<{ subscriberId: number | string }, null, any>
  ): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!accessToken) {
      request.error("Please login to subscribe");
      return;
    }
    await this.http
      .post<IResponseLayout<null>>(
        this.UserURL.SUBSCRIBE(request.data.subscriberId),
        null,
        {
          headers: {
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
      .catch((error) => {
        request.error(error);
      });
  }
  async unsubscribe(
    request: IRequest<{ un_subscriberId: number | string }, null, any>
  ): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!accessToken) {
      request.error("Access token not found");
      return;
    }
    await this.http
      .delete<IResponseLayout<null>>(
        this.UserURL.UNSUBSCRIBE(request.data.un_subscriberId),
        {
          headers: {
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
      .catch((error) => {
        request.error(error);
      });
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
