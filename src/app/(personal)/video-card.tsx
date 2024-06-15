"use client";
import { Video } from "@/interfaces/video.i";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SlControlPlay } from "react-icons/sl";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface IVideoCardProps {
  video: Video;
  className?: ClassValue;
}
const VideoCard: React.FC<IVideoCardProps> = ({ video, className }) => {
  const [hiddenSlControlPlay, setHiddenSlControlPlay] =
    React.useState<boolean>(true);
  return (
    <div className={cn(className)}>
      <div className="h-[200px] overflow-hidden relative rounded">
        <Link href={`/video/${video.slug}`}>
          <Image
            src={video.image}
            alt={video.name}
            width={500}
            height={500}
            className={cn(
              "w-full h-[200px] object-cover overflow-hidden transition-all hover:scale-125 hover:opacity-15 rounded"
            )}
            onMouseMove={() => {
              setHiddenSlControlPlay(false);
            }}
            onMouseOut={() => {
              setHiddenSlControlPlay(true);
            }}
          />
        </Link>
        <div
          className={cn(
            "absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
            {
              hidden: hiddenSlControlPlay,
            }
          )}
        >
          <SlControlPlay
            className="text-5xl text-p3"
            onMouseMove={() => {
              setHiddenSlControlPlay(false);
            }}
            onMouseOut={() => {
              setHiddenSlControlPlay(true);
            }}
          />
        </div>
      </div>
      <Link
        href={`/video/${video.slug}`}
        className="text-sm hover:text-p3 line-clamp-2 text-ellipsis font-bold"
      >
        {video.name}
      </Link>
      <Link href={`/user/${video?.uploader?.id}`} className="text-sm font-medium text-stone-400">
        {video.uploader.fullName}
      </Link>
    </div>
  );
};

export default VideoCard;
