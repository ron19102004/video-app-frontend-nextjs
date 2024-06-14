import { IRequest } from "@/interfaces";
import COOKIES_CONSTANT from "@/interfaces/cookies-constant.i";
import { Playlist } from "@/interfaces/playlist.i";
import { API, Http, IResponseLayout } from "@/lib/http";
import Cookies from "js-cookie";

export interface IPlaylistController {
  getMyPlaylists(): Promise<Array<Playlist>>;
  getUserConfirmedPlaylists(userId: number | string): Promise<Array<Playlist>>;
  createPlaylist(
    request: IRequest<{ name: string; isPublic: boolean }, null, any>
  ): Promise<void>;
  delete(request: IRequest<{ id: number }, null, any>): Promise<void>;
  pushVideoToPlaylist(
    request: IRequest<{ playlistId: number; videoId: number }, null, any>
  ): Promise<void>;
  deleteVideoByVideoPlaylistId(
    request: IRequest<{ videoPlaylistId: number }, null, any>
  ): Promise<void>;
}
export default class PlaylistController implements IPlaylistController {
  private PlaylistURL = API.PlaylistURL;
  private http: Http;
  constructor(http: Http) {
    this.http = http;
  }
  async getUserConfirmedPlaylists(
    userId: number | string
  ): Promise<Array<Playlist>> {
    const response = await this.http.get<IResponseLayout<Array<Playlist>>>(
      this.PlaylistURL.GET_USER_CONFIRMED_PLAYLISTS(userId)
    );
    return response.data.data?? [];
  }
  async createPlaylist(
    request: IRequest<{ name: string; isPublic: boolean }, null, any>
  ): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!accessToken) {
      request.error("Access token not found");
      return;
    }
    await this.http
      .post<IResponseLayout<null>>(
        this.PlaylistURL.CREATE_PLAYLIST,
        request.data,
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
      .delete<IResponseLayout<null>>(
        this.PlaylistURL.DELETE_PLAYLIST(request.data.id),
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
      .catch((err) => request.error(err));
  }
  async pushVideoToPlaylist(
    request: IRequest<{ playlistId: number; videoId: number }, null, any>
  ): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!accessToken) {
      request.error("Access token not found");
      return;
    }
    const formData = new FormData();
    formData.append("playlistId", request.data.playlistId.toString());
    formData.append("videoId", request.data.videoId.toString());
    await this.http
      .post<IResponseLayout<null>>(
        this.PlaylistURL.PUSH_VIDEO_TO_PLAYLIST,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
  async deleteVideoByVideoPlaylistId(
    request: IRequest<{ videoPlaylistId: number }, null, any>
  ): Promise<void> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!accessToken) {
      request.error("Access token not found");
      return;
    }
    await this.http
      .delete<IResponseLayout<null>>(
        this.PlaylistURL.DELETE_VIDEO_BY_VIDEO_PLAYLIST_ID(
          request.data.videoPlaylistId
        ),
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
      .catch((err) => request.error(err));
  }
  async getMyPlaylists(): Promise<Array<Playlist>> {
    const accessToken = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    const response = await this.http.get<IResponseLayout<Array<Playlist>>>(
      this.PlaylistURL.GET_MY_PLAYLIST,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data ?? [];
  }
}
