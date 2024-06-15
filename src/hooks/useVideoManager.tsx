import VideoController, {
  IVideoManagerController,
} from "@/controllers/video.controller";
import {
  IDataNewInformation,
  IUploadPosterRequest,
  IUploadSourceRequest,
  Video,
} from "@/interfaces/video.i";
import http from "@/lib/http";
import { create } from "zustand";
export interface IUseVideoManagerChangePrivacy {
  changePrivacyVip(
    data: { id: number; isPublic: boolean; isVip: boolean },
    toast: (message: string) => void
  ): Promise<void>;
}
export interface IUseVideoManagerDeleteVideo {
  deleteVideo(id: number, toast: (message: string) => void): Promise<void>;
}
export interface IUseVideoManagerPosterAndSource{
  pushPoster(
    data: IUploadPosterRequest,
    toast: (message: string) => void
  ): Promise<void>;
  pushSource(
    data: IUploadSourceRequest,
    toast: (message: string) => void
  ): Promise<void>;
}
interface IUseVideoManager
  extends IUseVideoManagerChangePrivacy,
    IUseVideoManagerDeleteVideo,IUseVideoManagerPosterAndSource {
  pushNewInfo(
    info: IDataNewInformation,
    toast: (message: string) => void
  ): Promise<number>;
  getMyVideos(): Promise<Array<Video>>;
}
const useVideoManager = create<IUseVideoManager>(() => {
  const videoController: IVideoManagerController = new VideoController(http);
  return {
    pushNewInfo: async (
      info: IDataNewInformation,
      toast: (message: string) => void
    ) => {
      let id: number = -1;
      await videoController.createInfoVideo({
        data: info,
        success: function (data: { id: number }): void {
          id = data.id;
          toast("New video created successfully");
        },
        error: function (err: string): void {
          console.log(err);
          toast("Error creating new video");
        },
      });
      return id;
    },
    pushPoster: async (
      data: IUploadPosterRequest,
      toast: (message: string) => void
    ) => {
      await videoController.uploadPoster({
        data: data,
        success: function (): void {
          toast("Poster uploaded successfully");
        },
        error: function (err: string): void {
          console.log(err);
          toast("Error uploading poster");
        },
      });
    },
    pushSource: async (
      data: IUploadSourceRequest,
      toast: (message: string) => void
    ) => {
      await videoController.uploadSrcVideo({
        data: data,
        success: function (): void {
          toast("Source uploaded successfully");
        },
        error: function (err: string): void {
          console.log(err);
          toast("Error uploading source");
        },
      });
    },
    getMyVideos: async () => {
      return await videoController.myVideos();
    },
    deleteVideo: async (id: number, toast: (message: string) => void) => {
      await videoController.deleteVideoById({
        data: { id: id },
        error(err) {
          console.log(err);
          toast("Error deleting video");
        },
        success() {
          toast("Video deleted successfully");
        },
      });
    },
    changePrivacyVip: async (
      data: { id: number; isPublic: boolean; isVip: boolean },
      toast: (message: string) => void
    ) => {
      await videoController.changePrivacyVip({
        data: data,
        error(err) {
          console.log(err);
          toast("Error changing privacy or vip");
        },
        success() {
          toast("Privacy or vip changed successfully");
        },
      });
    },
  };
});
export default useVideoManager;
