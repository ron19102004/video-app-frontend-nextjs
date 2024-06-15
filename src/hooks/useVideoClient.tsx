import VideoController, {
  IVideoClientController,
} from "@/controllers/video.controller";
import { Video } from "@/interfaces/video.i";
import http from "@/lib/http";
import { create } from "zustand";

interface IVideoClient {
  getVideos(pageNumber: number): Promise<Array<Video>>;
  getVideoBySlug(slug: string): Promise<Video | null>;
  getVideoByUploader(uploaderId: number): Promise<Array<Video>>;
}
const useVideoClient = create<IVideoClient>(() => {
  const videoController: IVideoClientController = new VideoController(http);
  return {
    getVideos: async (pageNumber: number) => {
      return await videoController.getVideos(pageNumber);
    },
    getVideoBySlug: async (slug: string) => {
      return await videoController.findVideoBySlug(slug);
    },
    getVideoByUploader: async (uploaderId: number) => {
      return await videoController.getVideosByUploaderId(uploaderId);
    },
  };
});
export default useVideoClient;
