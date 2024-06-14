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
interface IUseVideoManager {
  pushNewInfo(
    info: IDataNewInformation,
    toast: (message: string) => void
  ): Promise<number>;
  pushPoster(
    data: IUploadPosterRequest,
    toast: (message: string) => void
  ): Promise<void>;
  pushSource(
    data: IUploadSourceRequest,
    toast: (message: string) => void
  ): Promise<void>;
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
  };
});
export default useVideoManager;
