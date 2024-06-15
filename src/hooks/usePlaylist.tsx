import PlaylistController, {
  IPlaylistController,
} from "@/controllers/playlist.controller";
import { Playlist } from "@/interfaces/playlist.i";
import http from "@/lib/http";
import { create } from "zustand";
interface IUsePlaylist {
  getMyPlaylists(): Promise<Array<Playlist>>;
  getUserConfirmedPlaylists(userId: number | string): Promise<Array<Playlist>>;
  createPlaylist(
    data: { name: string; isPublic: boolean },
    toast: (message: string) => void
  ): Promise<void>;
  addVideoIntoPlaylist(
    data: { playlistId: number; videoId: number },
    toast: (message: string) => void
  ): Promise<void>;
  deletePlaylist(
    data: { id: number },
    toast: (message: string) => void
  ): Promise<void>;
  deleteVideoPlaylistByVideoPlaylistId(
    data: { videoPlaylistId: number },
    toast: (message: string) => void
  ): Promise<void>;
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
    createPlaylist: async (
      data: { name: string; isPublic: boolean },
      toast: (message: string) => void
    ) => {
      await playlistController.createPlaylist({
        error(err) {
          toast("Error creating playlist");
        },
        success() {
          toast("Create playlist successfully!");
        },
        data: data,
      });
    },
    addVideoIntoPlaylist: async (
      data: { playlistId: number; videoId: number },
      toast: (message: string) => void
    ) => {
      await playlistController.pushVideoIntoPlaylist({
        error(err) {
          toast("Error adding video into playlist");
        },
        success() {
          toast("Add video into playlist successfully!");
        },
        data: data,
      });
    },
    deletePlaylist: async (
      data: { id: number },
      toast: (message: string) => void
    ) => {
      await playlistController.delete({
        error(err) {
          toast("Error deleting playlist");
        },
        success() {
          toast("Delete playlist successfully!");
        },
        data: data,
      });
    },
    deleteVideoPlaylistByVideoPlaylistId: async (
      data: { videoPlaylistId: number },
      toast: (message: string) => void
    ) => {
      await playlistController.deleteVideoPlaylistByVideoPlaylistId({
        error(err) {
          toast("Error deleting video from playlist");
        },
        success() {
          toast("Delete video from playlist successfully!");
        },
        data: data,
      });
    },
  };
});
export default usePlaylist;
