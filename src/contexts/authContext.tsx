"use client";
import useAuth, { IUseAuth } from "@/hooks/useAuth";
import { LoginRequest, RegisterRequest } from "@/interfaces/user.i";
import { createContext } from "react";

export const AuthContext = createContext<IUseAuth>({
  isAuth: false,
  userCurrent: null,
  vip: null,
  register: function (
    registerRequest: RegisterRequest,
    redirect: (href: string) => void
  ): Promise<void> {
    throw new Error("Function not implemented.");
  },
  login: function (
    loginRequest: LoginRequest,
    redirect: (href: string) => void
  ): Promise<void> {
    throw new Error("Function not implemented.");
  },
  logout: function (redirect: (href: string) => void): void {
    throw new Error("Function not implemented.");
  },
  checkAuthentication: function (): void {
    throw new Error("Function not implemented.");
  },
  verifyOTP: function (
    data: { otp: string; token: string },
    redirect: (href: string) => void,
    toast: (message: string) => void
  ): Promise<void> {
    throw new Error("Function not implemented.");
  },
});
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
