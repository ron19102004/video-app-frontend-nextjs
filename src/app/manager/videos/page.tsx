"use client";
import useVideoManager from "@/hooks/useVideoManager";
import { Video } from "@/interfaces/video.i";
import ForEach from "@/lib/foreach-component";
import Link from "next/link";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { TbNewSection, TbReload } from "react-icons/tb";
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
    <div className="space-y-2">
      <h1 className="font-bold text-xl">
        My videos manager {`(`} {myVideos.length} {`videos)`}
      </h1>
      <div className="flex gap-2">
        <Link
          href={"/manager/videos/new"}
          className="font-bold bg-p3_2 p-2 rounded-md  hover:underline flex justify-start items-center gap-1 "
        >
          <TbNewSection />
          <span>New video</span>
        </Link>
        <button
          className="flex justify-start items-center gap-1 bg-p1 p-2 rounded-md hover:underline"
          onClick={async () => {
            await init();
          }}
        >
          <TbReload />
          <span>Reload</span>
        </button>
      </div>
      <ul className="w-full overflow-y-auto max-h-[80vh] space-y-2">
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
