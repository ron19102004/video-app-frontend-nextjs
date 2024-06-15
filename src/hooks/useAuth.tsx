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
    redirect: (href: string) => void,
    tfaAction: (token: string) => void
  ): Promise<void>;
  logout(redirect: (href: string) => void): void;
  register(
    registerRequest: RegisterRequest,
    redirect: (href: string) => void
  ): Promise<void>;
  checkAuthentication(): void;
  verifyOTP(
    data: { otp: string; token: string },
    redirect: (href: string) => void,
    toast: (message: string) => void
  ): Promise<void>;
}
const useAuth = create<IUseAuth>((set) => {
  const authController: IAuthController = new AuthController(http);
  return {
    isAuth: false,
    userCurrent: null,
    vip: null,
    login: async (
      loginRequest: LoginRequest,
      redirect: (href: string) => void,
      tfaAction: (token: string) => void
    ) => {
      await authController.login<IResponseLayout<IDataLoginResponse>>(
        loginRequest,
        (data) => {
          if (data.status && data.data) {
            const dt = data.data;
            if (!dt.TFA) {
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
            } else {
              tfaAction(dt.token);
            }
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
    verifyOTP: async (
      data: { otp: string; token: string },
      redirect: (href: string) => void,
      toast: (message: string) => void
    ) => {
      await authController.verifyOTP({
        data: data,
        error(err) {
          console.log(err);
          toast("Error verifying OTP token")
        },
        success(data) {
          set({
            isAuth: true,
            userCurrent: data.user,
            vip: data.vip,
          });
          Cookies.set(COOKIES_CONSTANT.IS_AUTHENTICATED, "true", {
            expires: 4,
          });
          Cookies.set(COOKIES_CONSTANT.ACCESS_TOKEN, data.token, {
            expires: 4,
          });
          redirect("/");
        },
      });
    },
  };
});
export default useAuth;
export interface IDataLoginResponse {
  TFA: boolean;
  token: string;
  user: User;
  vip: Vip;
}
