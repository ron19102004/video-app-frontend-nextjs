import VideoController, {
  ISearchVideoController,
} from "@/controllers/video.controller";
import { ISearchRequest, Video } from "@/interfaces/video.i";
import http from "@/lib/http";
import { create } from "zustand";

interface ISearchVideo {
  search(query: ISearchRequest): Promise<Array<Video>>;
}
const useSearchVideo = create<ISearchVideo>((_set) => {
  const videoController: ISearchVideoController = new VideoController(http);
  return {
    search: async (query: ISearchRequest) => {
      return await videoController.search(query);
    },
  };
});
export default useSearchVideo;
