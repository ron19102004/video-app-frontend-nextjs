"use client";
import useVideoManager from "@/hooks/useVideoManager";
import { Video } from "@/interfaces/video.i";
import ForEach from "@/lib/foreach-component";
import React, { lazy, Suspense, useEffect, useState } from "react";
const VideoCardManager = lazy(() => import("./video-card-manager"));
const MyVideoManagement = () => {
  const [myVideos, setMyVideos] = useState<Array<Video>>([]);
  const { getMyVideos } = useVideoManager();
  const init = async () => {
    const vids = await getMyVideos();
    setMyVideos(vids);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <h1 className="font-bold text-xl">My videos manager</h1>

      <ul className="w-full overflow-y-auto max-h-[85vh] space-y-2">
        <ForEach
          list={myVideos}
          render={(item: Video) => {
            return (
              <Suspense>
                <VideoCardManager video={item} />
              </Suspense>
            );
          }}
        />
      </ul>
    </div>
  );
};

export default MyVideoManagement;
