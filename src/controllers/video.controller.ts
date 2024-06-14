import { IRequest } from "@/interfaces";
import COOKIES_CONSTANT from "@/interfaces/cookies-constant.i";
import {
  IDataNewInformation,
  ISearchRequest,
  IUploadSourceRequest,
  IUploadPosterRequest,
  Video,
} from "@/interfaces/video.i";
import { API, Http, IResponseLayout } from "@/lib/http";
import Cookies from "js-cookie";

export interface IVideoClientController {
  getVideos(pageNumber: number): Promise<Array<Video> | []>;
  findVideoBySlug(slug: string): Promise<Video | null>;
}
export interface IVideoManagerController {
  createInfoVideo(
    request: IRequest<IDataNewInformation, { id: number }, string>
  ): Promise<void>;
  uploadPoster(
    request: IRequest<IUploadPosterRequest, null, any>
  ): Promise<void>;
  uploadSrcVideo(
    request: IRequest<IUploadSourceRequest, null, any>
  ): Promise<void>;
  myVideos(): Promise<Array<Video>>;
}
export interface ISearchVideoController {
  search(request: ISearchRequest): Promise<Array<Video>>;
}
export default class VideoController
  implements
    IVideoClientController,
    IVideoManagerController,
    ISearchVideoController
{
  private VideoURL = API.VideoURL;
  private http: Http;
  constructor(http: Http) {
    this.http = http;
  }
  async myVideos(): Promise<Array<Video>> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    const response = await this.http.get<IResponseLayout<Array<Video>>>(
      this.VideoURL.GET_MY_VIDEOS,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data ?? [];
  }
  async getVideos(pageNumber: number): Promise<Array<Video> | []> {
    const response = await this.http.get<IResponseLayout<Array<Video>>>(
      this.VideoURL.GET_VIDEOS(pageNumber)
    );
    return response.data.data ?? [];
  }
  async findVideoBySlug(slug: string): Promise<Video | null> {
    const response = await this.http.get<IResponseLayout<Video>>(
      this.VideoURL.GET_VIDEO_BY_SLUG(slug)
    );
    return response.data.data ?? null;
  }
  async search(request: ISearchRequest): Promise<Array<Video>> {
    const response = await this.http.get<IResponseLayout<Array<Video>>>(
      this.VideoURL.SEARCH(request)
    );
    return response.data.data ?? [];
  }
  async createInfoVideo(
    request: IRequest<IDataNewInformation, { id: number }, string>
  ): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    await this.http
      .post<IResponseLayout<Video>>(
        this.VideoURL.CREATE_VIDEO_INFORMATION,
        request.data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const data: Video | null = response.data.data;
          if (response.data.status && data !== null) {
            request.success({ id: data.id });
          } else {
            request.error(response.data.message);
          }
        }
      })
      .catch((error) => {
        request.error(error);
      });
  }
  async uploadPoster(
    request: IRequest<IUploadPosterRequest, null, any>
  ): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    const formData = new FormData();
    formData.append("file", request.data.file);
    await this.http
      .post<IResponseLayout<null>>(
        this.VideoURL.UPLOAD_POSTER(request.data.videoId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status) {
            request.success(null);
          } else {
            request.error(response.data.message);
          }
        }
      })
      .catch((error) => {
        request.error(error);
      });
  }
  async uploadSrcVideo(
    request: IRequest<IUploadSourceRequest, null, any>
  ): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    const formData = new FormData();
    formData.append("file", request.data.file);
    await this.http
      .post<IResponseLayout<null>>(
        this.VideoURL.UPLOAD_SOURCE(request.data.videoId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.status) {
            request.success(null);
          } else {
            request.error(response.data.message);
          }
        }
      })
      .catch((error) => {
        request.error(error);
      });
  }
}
