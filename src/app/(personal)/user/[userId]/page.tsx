"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IResponseUserConfirmed } from "@/controllers/user.controller";
import useUser from "@/hooks/useUser";
import useVideoClient from "@/hooks/useVideoClient";
import { SubscribeInfo } from "@/interfaces/user.i";
import { Video } from "@/interfaces/video.i";
import ForEach from "@/lib/foreach-component";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
interface IUserProfileProps {
  userId: number;
}
const UserProfile = ({ params }: { params: IUserProfileProps }) => {
  const [resUserConfirmed, setResUserConfirmed] =
    React.useState<IResponseUserConfirmed>({
      user: null,
      isSubscribing: false,
    });
  const [subscribe, setSubscribe] = useState<SubscribeInfo>({
    subscribed: 0,
    subscribing: 0,
  });
  const [videos, setVideos] = useState<Array<Video>>([]);
  const {
    getUserConfirmed,
    getSubscribedUser,
    subscribe: subs,
    unsubscribe,
  } = useUser();
  const { getVideoByUploader } = useVideoClient();
  const init = async () => {
    const [res, s, v] = await Promise.all([
      getUserConfirmed(params.userId),
      getSubscribedUser(params.userId),
      getVideoByUploader(params.userId),
    ]);
    setSubscribe(s);
    setResUserConfirmed(res);
    setVideos(v);
    console.log(v);
  };
  React.useEffect(() => {
    init();
  }, [params.userId]);
  const { toast } = useToast();
  const subscribeHandler = () => {
    if (resUserConfirmed.isSubscribing) {
      unsubscribe(params.userId, (mess) => {
        toast({
          title: mess,
        });
      });
    } else {
      subs(params.userId, (mess) => {
        toast({
          title: mess,
        });
      });
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="p-3 w-80">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={resUserConfirmed.user?.imageURL ?? ""}
              width={110}
              height={110}
              alt="Profile Picture"
              className="bottom-0 w-28 h-28 rounded-full object-cover"
              quality={100}
            />
            <h1 className="text-2xl font-bold text-center">
              {resUserConfirmed.user?.fullName}
            </h1>
            <h2 className="italic">@{resUserConfirmed.user?.username}</h2>
            <Button
              onClick={subscribeHandler}
              className={cn({
                "": resUserConfirmed.isSubscribing,
                "bg-p3_2": !resUserConfirmed.isSubscribing,
              })}
            >
              {resUserConfirmed.isSubscribing ? "Unsubscribe" : "Subscribe"}
            </Button>
          </div>
          <hr className="my-4 border-t border-gray-300" />
          <div className="flex justify-between mx-2">
            <div className="text-center">
              <span className="block font-bold text-lg">
                {subscribe.subscribed}
              </span>
              <span className="text-xs">Followers</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-lg">
                {subscribe.subscribing}
              </span>
              <span className="text-xs">Following</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="p-3">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <ForEach
            list={videos}
            render={(video: Video) => {
              return (
                <li>
                  <Link href={"/video/" + video.slug}>
                    <Image
                      src={video.image}
                      alt={video.name}
                      width={500}
                      height={500}
                      className="w-full h-52 md:h-44 lg:h-40 object-cover rounded shadow-md"
                    />
                  </Link>
                  <Link href={"/video/" + video.slug}>
                    <h3 className="font-bold hover:text-p3 line-clamp-2 text-ellipsis">
                      {video.name}
                    </h3>
                  </Link>
                </li>
              );
            }}
          />
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
