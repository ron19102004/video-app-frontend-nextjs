"use client";
import { Video } from "@/interfaces/video.i";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IVideoCardSearchProps {
  video: Video;
}
const VideoCardSearch: React.FC<IVideoCardSearchProps> = ({ video }) => {
  const hrefPlayVideo = `/video/${video.slug}`;
  return (
    <div className="md:flex gap-3">
      <div className="md:basis-2/5 lg:basis-1/5">
        <Link href={hrefPlayVideo}>
          <Image
            src={video.image}
            alt={video.name}
            width={500}
            height={500}
            className="w-full h-52 md:h-44 lg:h-40 object-cover rounded shadow-md"
          />
        </Link>
      </div>
      <div className="md:basis-3/5">
        <Link href={hrefPlayVideo}>
          <h1 className="text-xl font-bold hover:text-p3 text-ellipsis line-clamp-2 md:line-clamp-3">
            {video.name}
          </h1>
        </Link>
        <div className="flex justify-start gap-2 items-center">
          <div>
            <Image
              src={video?.uploader?.imageURL ?? ""}
              alt={video?.uploader.fullName ?? "unknown"}
              width={500}
              height={500}
              className="rounded-full w-10 h-10 object-cover"
            />
          </div>
          <Link href={`/user/${video?.uploader?.id}`} className="font-bold">
            {video?.uploader.fullName}
          </Link>
        </div>
        <p className="md:text-sm text-xs text-ellipsis line-clamp-2 text-neutral-400">
          {video.description}
        </p>
      </div>
    </div>
  );
};

export default VideoCardSearch;
