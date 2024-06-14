import PlaylistController, {
  IPlaylistController,
} from "@/controllers/playlist.controller";
import { Playlist } from "@/interfaces/playlist.i";
import http from "@/lib/http";
import { create } from "zustand";
interface IUsePlaylist {
  getMyPlaylists(): Promise<Array<Playlist>>;
  getUserConfirmedPlaylists(userId: number | string): Promise<Array<Playlist>>;
}
const usePlaylist = create<IUsePlaylist>(() => {
  const playlistController: IPlaylistController = new PlaylistController(http);
  return {
    getMyPlaylists: async () => {
      return await playlistController.getMyPlaylists();
    },
    getUserConfirmedPlaylists: async (userId: number | string) => {
      return await playlistController.getUserConfirmedPlaylists(userId);
    },
  };
});
export default usePlaylist;
