export enum Role {
  admin = "ADMIN",
  user = "USER",
}
export enum Privacy {
  public = "PUBLIC",
  private = "PRIVATE",
}
export interface User {
  id: number;
  updatedAt?: string;
  createdAt?: string;
  fullName: string;
  phone: string;
  email: string;
  username: string;
  confirmed: boolean;
  role: Role;
  imageURL?: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
}
export interface Vip {
  active: boolean;
  createdAt: string;
  expiredAt: string;
  id: number;
  issuedAt: string;
  updatedAt: string;
}
