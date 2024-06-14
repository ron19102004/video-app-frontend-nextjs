import { ISearchRequest } from "@/interfaces/video.i";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
interface HttpConfig {
  baseURL: string;
  timeout: number;
}
export class Http {
  private config: HttpConfig;
  constructor(config: HttpConfig) {
    this.config = config;
  }
  private urlMatcher(url: string): string {
    return this.config.baseURL + url;
  }
  public get<T>(
    url: string,
    configs?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<T>> {
    return axios.get<T>(this.urlMatcher(url), configs);
  }
  public post<T>(
    url: string,
    data?: any,
    configs?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<T>> {
    return axios.post<T>(this.urlMatcher(url), data, configs);
  }
  public put<T>(
    url: string,
    data?: any,
    configs?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<T>> {
    return axios.put<T>(this.urlMatcher(url), data, configs);
  }
  public delete<T>(
    url: string,
    configs?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<T>> {
    return axios.delete<T>(this.urlMatcher(url), configs);
  }
  public patch<T>(
    url: string,
    data?: any,
    configs?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<T>> {
    return axios.patch<T>(this.urlMatcher(url), data, configs);
  }
}
// const httpConfig: HttpConfig = {
//   baseURL: "http://localhost:80",
//   timeout: 10000,
// };
const httpConfig: HttpConfig = {
  baseURL: "http://49.236.210.169",
  timeout: 10000,
};
const http = new Http(httpConfig);
export default http;

export interface IResponseLayout<T> {
  data: T | null;
  message: string;
  status: boolean;
}
export const API = {
  AuthURL: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    CHECK_AUTHENTICATION: "/users/info",
  },
  CategoryURL: {
    GET_ALL: "/categories",
    CREATE: "/categories/new",
    UPDATE_NAME: (id: number) => `/categories/${id}/update-name`,
    UPDATE_IMAGE: (id: number) => `/categories/${id}/update-image`,
    DELETE: (id: number) => `/categories/${id}`,
  },
  CountryURL: {
    GET_COUNTRIES: "/countries",
    CREATE: "/countries/new",
    UPDATE: (id: number) => `/countries/${id}`,
    DELETE: (id: number) => `/countries/${id}`,
  },
  UserURL: {
    GET_USER_CONFIRMED: (isLoggedIn: boolean, userId: number | string) => {
      return !isLoggedIn
        ? `/users/info-confirmed?id=${userId}`
        : `/users/loggedIn/info-confirmed?id=${userId}`;
    },
  },
  VideoURL: {
    GET_VIDEOS: (pageNumber: number) => `/videos?page=${pageNumber}`,
    GET_VIDEO_BY_SLUG: (slug: string) => `/videos/item/${slug}`,
    SEARCH: (data: ISearchRequest) => {
      let query: string[] = [];
      if (data.name) query = [...query, "name=" + data.name];
      if (data.category_id)
        query = [...query, "category_id=" + data.category_id];
      if (data.country_id) query = [...query, "country_id=" + data];
      return `/videos/search?${query.join("&")}`;
    },
    CREATE_VIDEO_INFORMATION: "/videos/new-info",
    UPLOAD_POSTER: (videoId: number) => `/videos/upload-image/${videoId}`,
    UPLOAD_SOURCE: (videoId: number) => `/videos/upload-video/${videoId}`,
    GET_MY_VIDEOS: "/videos/my-videos",
  },
  PlaylistURL: {
    GET_MY_PLAYLIST: "/playlists/my",
    CREATE_PLAYLIST: "/playlists/new",
    DELETE_PLAYLIST: (id: number) => "/playlists?id=" + id,
    PUSH_VIDEO_TO_PLAYLIST: "/playlists/add",
    DELETE_VIDEO_BY_VIDEO_PLAYLIST_ID: (id: number) =>
      "/playlists/video?videoPlaylistId=" + id,
    GET_USER_CONFIRMED_PLAYLISTS: (userId: number | string) =>
      "/playlists/user-confirmed?userId=" + userId,
  },
};
