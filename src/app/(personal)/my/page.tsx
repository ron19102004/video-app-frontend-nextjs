"use client";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/authContext";
import useUser from "@/hooks/useUser";
import { SubscribeInfo } from "@/interfaces/user.i";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

const MyProfile = () => {
  const { getSubscribedUser } = useUser();
  const { userCurrent, isAuth } = use(AuthContext);
  const [subscribe, setSubscribe] = useState<SubscribeInfo>({
    subscribed: 0,
    subscribing: 0,
  });
  const init = async () => {
    if (userCurrent) {
      const s: SubscribeInfo = await getSubscribedUser(userCurrent?.id);
      setSubscribe(s);
    }
  };
  useEffect(() => {
    init();
  }, [userCurrent]);
  return isAuth ? (
    <div className="p-3">
      <div className="flex flex-col justify-center items-center">
        <div className="p-3 w-80">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={userCurrent?.imageURL ?? ""}
              width={110}
              height={110}
              alt="Profile Picture"
              className="bottom-0 w-28 h-28 rounded-full object-cover"
              quality={100}
            />
            <h1 className="text-2xl font-bold text-center">
              {userCurrent?.fullName}
            </h1>
            <h2 className="italic">@{userCurrent?.username}</h2>
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
    </div>
  ) : (
    <div className="p-3">
      <Button className="bg-p3_2 p-2 rounded-md">
        <Link href={"/login"}>Login</Link>
      </Button>
    </div>
  );
};

export default MyProfile;
