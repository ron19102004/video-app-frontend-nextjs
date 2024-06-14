"use client";
import { IResponseUserConfirmed } from "@/controllers/user.controller";
import useUser from "@/hooks/useUser";
import React from "react";
interface IUserProfileProps {
  userId: string;
}
const UserProfile = ({ params }: { params: IUserProfileProps }) => {
  const [resUserConfirmed, setResUserConfirmed] =
    React.useState<IResponseUserConfirmed>({
      user: null,
      isSubscribing: false,
    });
  const { getUserConfirmed } = useUser();
  const init = async () => {
    const res = await getUserConfirmed(params.userId);
    setResUserConfirmed(res);
  };
  React.useEffect(() => {
    init();
  }, [params.userId]);
  return <div>{resUserConfirmed.user?.fullName}</div>;
};

export default UserProfile;
