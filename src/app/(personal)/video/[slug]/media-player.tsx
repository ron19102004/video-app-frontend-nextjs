"use client";
import { Video } from "@/interfaces/video.i";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface IMediaPlayerProps {
  video: Video | null;
}
const MediaPlayer: React.FC<IMediaPlayerProps> = ({ video }) => {
  return (
    <div className="space-y-3 p-3 md:px-0 ">
      <div className="relative w-full h-[210px] md:h-[418px] xl:h-[650px] xl:w-[1020px] 2xl:w-full">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-2xl"
          style={{
            backgroundImage: `url(${video?.image || video?.src})`,
          }}
        ></div>
        <video
          src={video?.src}
          controls
          className="relative rounded-xl w-full h-full bg-black"
        ></video>
      </div>
      <div>
        <h1 className="font-bold text-xl text-p3">{video?.name}</h1>
        <div className="flex justify-start gap-2 items-center">
          <div>
            <Image
              src={video?.uploader?.imageURL ?? ""}
              alt={video?.uploader.fullName ?? "unknown"}
              width={50}
              height={50}
              className="rounded-full w-12 h-12 object-cover"
            />
          </div>
          <Link href={`/user/${video?.uploader?.id}`} className="font-bold">
            {video?.uploader.fullName}
          </Link>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl text-p4">Description</h1>
        <p className="text-neutral-400">{video?.description}</p>
      </div>
    </div>
  );
};

export default MediaPlayer;
