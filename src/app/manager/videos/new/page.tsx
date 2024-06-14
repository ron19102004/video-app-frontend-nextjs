"use client";
import useVideoManager from "@/hooks/useVideoManager";
import React from "react";

const NewVideoPage = () => {
  const { pushNewInfo, pushPoster, pushSource } = useVideoManager();
  return <div>new</div>;
};

export default NewVideoPage;
