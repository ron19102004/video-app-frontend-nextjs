"use client";
import { Video } from "@/interfaces/video.i";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SlControlPlay } from "react-icons/sl";
import ChangePrivacyDialog from "./change-privacy";
import {
  IUseVideoManagerChangePrivacy,
  IUseVideoManagerDeleteVideo,
  IUseVideoManagerPosterAndSource,
} from "@/hooks/useVideoManager";
import { useToast } from "@/components/ui/use-toast";
import { Privacy } from "@/interfaces/user.i";
import ChangePosterSrcDialog from "./change-poster-src";
interface IVideoCardManager
  extends IUseVideoManagerChangePrivacy,
    IUseVideoManagerDeleteVideo,
    IUseVideoManagerPosterAndSource {
  video: Video;
  initData(): Promise<void>;
}
const VideoCardManager: React.FC<IVideoCardManager> = ({
  video,
  changePrivacyVip,
  deleteVideo,
  initData,
  pushPoster,
  pushSource,
}) => {
  const { toast } = useToast();
  const [hiddenSlControlPlay, setHiddenSlControlPlay] =
    React.useState<boolean>(true);
  return (
    <div
      className={cn("flex gap-2 ring-2 p-3 rounded-lg", {
        "ring-p3_2": video.privacy === Privacy.public,
        "ring-red-600": video.privacy !== Privacy.public,
      })}
    >
      <div className="basis-2/5 flex flex-col gap-2 justify-center">
        <div className="h-[200px] overflow-hidden relative rounded ">
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
        <div className="flex justify-start items-center gap-2 h-10">
          <h1 className="bg-p1 h-full rounded-md px-6 py-2 font-bold hover:underline">
            Action:{" "}
          </h1>
          <ChangePosterSrcDialog
            video={video}
            pushPoster={pushPoster}
            pushSource={pushSource}
          />
          <ChangePrivacyDialog
            video={video}
            changePrivacyVip={changePrivacyVip}
          />
          <button
            className="bg-red-700 px-3 h-full py-2 rounded-md  hover:underline"
            onClick={async () => {
              await deleteVideo(video.id, (mess) => {
                toast({
                  title: mess,
                });
              });
              await initData();
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-bold hover:text-p3 text-ellipsis line-clamp-2 md:line-clamp-3">
          {video.name}
        </h1>
        <p className="md:text-sm text-xs text-neutral-400">
          {video.description}
        </p>
      </div>
    </div>
  );
};

export default VideoCardManager;
