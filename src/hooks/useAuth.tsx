"use client";
import AuthController, {
  IAuthController,
  IDataCheckAuthentication,
} from "@/controllers/auth.controller";
import { LoginRequest, RegisterRequest, User, Vip } from "@/interfaces/user.i";
import http, { IResponseLayout } from "@/lib/http";
import { create } from "zustand";
import Cookies from "js-cookie";
import COOKIES_CONSTANT from "@/interfaces/cookies-constant.i";
export interface IUseAuth {
  isAuth: boolean;
  userCurrent: User | null;
  vip: Vip | null;
  login(
    loginRequest: LoginRequest,
    redirect: (href: string) => void
  ): Promise<void>;
  logout(redirect: (href: string) => void): void;
  register(
    registerRequest: RegisterRequest,
    redirect: (href: string) => void
  ): Promise<void>;
  checkAuthentication(): void;
}
const useAuth = create<IUseAuth>((set) => {
  const authController: IAuthController = new AuthController(http);
  return {
    isAuth: false,
    userCurrent: null,
    vip: null,
    login: async (
      loginRequest: LoginRequest,
      redirect: (href: string) => void
    ) => {
      await authController.login<IResponseLayout<IDataLoginResponse>>(
        loginRequest,
        (data) => {
          console.log(data);
          if (data.status && data.data) {
            set({
              isAuth: true,
              userCurrent: data.data.user,
              vip: data.data.vip,
            });
            Cookies.set(COOKIES_CONSTANT.IS_AUTHENTICATED, "true", {
              expires: 4,
            });
            Cookies.set(COOKIES_CONSTANT.ACCESS_TOKEN, data.data.token, {
              expires: 4,
            });
            redirect("/");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    logout(redirect: (href: string) => void) {
      set({
        isAuth: false,
        userCurrent: null,
        vip: null,
      });
      Cookies.remove(COOKIES_CONSTANT.ACCESS_TOKEN);
      Cookies.remove(COOKIES_CONSTANT.IS_AUTHENTICATED);
      redirect("/");
    },
    register: async (
      registerRequest: RegisterRequest,
      redirect: (href: string) => void
    ) => {
      await authController.register<IResponseLayout<any>>(
        registerRequest,
        (data) => {
          if (data.status) {
            redirect("/login");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    checkAuthentication() {
      authController.checkAuthentication(
        (data: IDataCheckAuthentication) => {
          set({
            isAuth: true,
            userCurrent: data.user,
            vip: data.vip,
          });
        },
        (error) => {
          set({
            isAuth: false,
            userCurrent: null,
            vip: null,
          });
        }
      );
    },
  };
});
export default useAuth;
interface IDataLoginResponse {
  TFA: boolean;
  token: string;
  user: User;
  vip: Vip;
}
