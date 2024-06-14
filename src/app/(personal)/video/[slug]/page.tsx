"use client";
import useVideoClient from "@/hooks/useVideoClient";
import { Video } from "@/interfaces/video.i";
import React from "react";
import MediaPlayer from "./media-player";

interface IVideoPlayerProps {
  slug: string;
}
const VideoPlayer = ({ params }: { params: IVideoPlayerProps }) => {
  const [video, setVideo] = React.useState<Video | null>(null);
  const { getVideoBySlug } = useVideoClient();
  const init = async () => {
    const vid = await getVideoBySlug(params.slug);
    setVideo(vid);
  };
  React.useEffect(() => {
    init();
  }, [params.slug]);
  return (
    <div>
      <MediaPlayer video={video} />
    </div>
  );
};

export default VideoPlayer;
