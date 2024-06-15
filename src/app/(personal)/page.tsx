"use client";
import VideoCard from "@/app/(personal)/video-card";
import { Button } from "@/components/ui/button";
import useCategory from "@/hooks/useCategory";
import useVideoClient from "@/hooks/useVideoClient";
import { Category } from "@/interfaces/category.i";
import { Video } from "@/interfaces/video.i";
import ForEach from "@/lib/foreach-component";
import { useRouter } from "next/navigation";
import React from "react";

const HomePage = () => {
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [videos, setVideos] = React.useState<Array<Video>>([]);
  const [categories, setCategories] = React.useState<Array<Category>>([]);
  const { getVideos } = useVideoClient();
  const { getCategories } = useCategory();
  const router = useRouter();
  const init = async () => {
    const [vids, cates] = await Promise.all([
      getVideos(pageNumber),
      getCategories(),
    ]);
    setVideos(vids);
    setCategories(cates);
  };
  React.useEffect(() => {
    init();
  }, [pageNumber]);
  return (
    <div className="flex p-3 space-x-3">
      <div className="flex-1">
        <h1 className="font-bold text-xl">Videos</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ForEach
            list={videos}
            render={(item: Video) => <VideoCard video={item} />}
          />
          {videos.length === 10 && (
            <Button
              className="w-full h-[200px] font-bold text-xl"
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
            >
              More
            </Button>
          )}
        </ul>
      </div>
      <div className="basis-1/4 hidden lg:block">
        <h1 className="font-bold text-xl">Categories</h1>
        <ul className="gap-1 flex flex-wrap">
          <ForEach
            list={categories}
            render={(item: Category) => {
              return (
                <Button
                  className="bg-p1 hover:bg-p3_2 transition-all"
                  onClick={() => {
                    router.push("/search?category_id=" + item.id);
                  }}
                >
                  {item.name}
                </Button>
              );
            }}
          />
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
