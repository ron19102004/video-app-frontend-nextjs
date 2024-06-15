"use client";
import useVideoManager from "@/hooks/useVideoManager";
import React, { useEffect, useState } from "react";
import AddInfoVideoContainer from "./add-info";
import { IDataNewInformation } from "@/interfaces/video.i";
import AddPosterContainer from "./add-poster";
import VideoSourceUpload from "./add-src";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const NewVideoPage = () => {
  const { pushNewInfo, pushPoster, pushSource } = useVideoManager();
  const { toast } = useToast();
  const [tab, setTab] = useState<number>(0);
  const [data, setData] = useState<{
    info: IDataNewInformation | null;
    poster: File | null;
    source: File | null;
  }>({
    info: null,
    poster: null,
    source: null,
  });
  const [preview, setPreview] = useState<{
    poster: string | null;
    source: string | null;
  }>({
    poster: null,
    source: null,
  });
  const onSubmitDataInfoVideo = (info: IDataNewInformation) => {
    setData({ ...data, info: info });
    setTab(1);
  };
  const onChangePoster = (file: File) => {
    setData({ ...data, poster: file });
    setTab(2);
  };
  const onChangeSource = (file: File) => {
    setData({ ...data, source: file });
    setTab(3);
  };
  useEffect(() => {
    if (data.poster && data.source) {
      const posterUrl = URL.createObjectURL(data.poster);
      const sourceUrl = URL.createObjectURL(data.source);
      setPreview({ poster: posterUrl, source: sourceUrl });
      return () => {
        URL.revokeObjectURL(posterUrl);
        URL.revokeObjectURL(sourceUrl);
      };
    }
  }, [data.poster, data.source]);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = "Are you sure you want to leave this page?";
      event.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const upload = async () => {
    if (data.info && data.poster && data.source) {
      const id: number = await pushNewInfo(data.info, (message) => {
        toast({
          title: message,
        });
      });
      await pushPoster({ videoId: id, file: data.poster }, (message) => {
        toast({
          title: message,
        });
      });
      await pushSource({ videoId: id, file: data.source }, (message) => {
        toast({
          title: message,
        });
      });
    }
  };
  return (
    <div>
      {tab === 0 ? (
        <AddInfoVideoContainer
          onSubmitData={onSubmitDataInfoVideo}
          data={data.info}
        />
      ) : null}
      {tab === 1 ? (
        <AddPosterContainer
          data={data.poster}
          onChange={onChangePoster}
          backTab={() => {
            setTab(0);
          }}
        />
      ) : null}
      {tab === 2 ? (
        <VideoSourceUpload
          data={data.source}
          onChange={onChangeSource}
          backTab={() => {
            setTab(1);
          }}
        />
      ) : null}
      {tab === 3 ? (
        <div>
          <div className="max-h-[85vh] overflow-y-auto space-y-3 p-3">
            <h1 className="font-bold text-2xl">Preview</h1>
            <div className={cn("flex gap-2 ring-2 p-3 rounded-lg ring-p3")}>
              <div className="basis-2/5 flex flex-col gap-2 justify-center">
                <div className="h-[200px] overflow-hidden relative rounded ">
                  <Image
                    src={preview?.poster ?? ""}
                    alt={data?.info?.name ?? ""}
                    width={500}
                    height={500}
                    className={cn(
                      "w-full h-[200px] object-cover overflow-hidden transition-all hover:scale-125 hover:opacity-15 rounded"
                    )}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold hover:text-p3 text-ellipsis line-clamp-2 md:line-clamp-3">
                  {data?.info?.name}
                </h1>
                <p className="md:text-sm text-xs text-neutral-400">
                  {data?.info?.description}
                </p>
              </div>
            </div>
            <div>
              <div className="relative w-full h-[210px] md:h-[418px] xl:h-[650px] xl:w-[1020px] 2xl:w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center filter blur-2xl"
                  style={{
                    backgroundImage: `url(${
                      preview?.poster || preview?.source
                    })`,
                  }}
                ></div>
                <video
                  src={preview?.source ?? ""}
                  controls
                  className="relative rounded-xl w-full h-full bg-black"
                ></video>
              </div>
            </div>
          </div>
          <div className="pt-3 flex gap-3">
            <Button
              className="hover:bg-p3_2 bg-p1 h-10 px-8"
              onClick={() => {
                setTab(2);
              }}
            >
              Back
            </Button>
            <Button className="hover:bg-p3_2 bg-p1 h-10 px-8" onClick={upload}>
              Upload
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NewVideoPage;
