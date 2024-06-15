"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { IUseCountryUpdate } from "@/hooks/useCountry";
import {
  IUseVideoManagerChangePrivacy,
  IUseVideoManagerPosterAndSource,
} from "@/hooks/useVideoManager";
import { Category } from "@/interfaces/category.i";
import { Country } from "@/interfaces/country.i";
import { Privacy } from "@/interfaces/user.i";
import { Video } from "@/interfaces/video.i";
import { cn } from "@/lib/utils";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IChangePosterSrcDialog extends IUseVideoManagerPosterAndSource {
  video: Video;
}
const ChangePosterSrcDialog: FC<IChangePosterSrcDialog> = ({
  video,
  pushPoster,
  pushSource,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(video.image);

  const [src, setSrc] = useState<File | null>(null);
  const [srcPreview, setSrcPreview] = useState<string | null>(video.src);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);
  useEffect(() => {
    if (src) {
      const objectUrl = URL.createObjectURL(src);
      setSrcPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [src]);
  const submitSrc = async () => {
    if (src !== null) {
      if (["video/mp4"].includes(src.type)) {
        setOpen(false);
        await pushSource(
          {
            file: src,
            videoId: video.id,
          },
          (mess) => {
            toast({
              title: mess,
            });
          }
        );
      } else {
        toast({
          title: "Please select a video file with type is video/mp4",
        });
      }
    } else {
      toast({
        title: "Please select a file",
      });
    }
  };
  const submitPoster = async () => {
    if (image) {
      if (
        ["image/png", "image/svg", "image/jpg", "image/jpeg"].includes(
          image.type
        )
      ) {
        setOpen(false);
        await pushPoster(
          {
            file: image,
            videoId: video.id,
          },
          (mess) => {
            toast({
              title: mess,
            });
          }
        );
      } else {
        toast({
          title: "Please select a png/jpg/svg image",
        });
      }
    } else {
      toast({
        title: "Please select an image",
      });
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(o: boolean) => {
        setOpen(o);
      }}
    >
      <DialogTrigger asChild>
        <button className="bg-p3_2 px-3 py-2 h-full rounded-md  hover:underline">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-p1">
        <div className="grid gap-4 py-4">
          <div>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-96 border-2  border-dashed rounded-lg cursor-pointer "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Selected"
                    width={500}
                    height={500}
                    className="w-full h-96 object-cover rounded-lg py-2"
                  />
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG
                    </p>
                  </>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </label>
            <Button onClick={submitPoster} className="mt-2">
              Update poster
            </Button>
          </div>
          <hr />
          <div>
            {!src && (
              <div
                className={cn(
                  "rounded-md border border-gray-100  p-4 shadow-md"
                )}
              >
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 fill-white stroke-indigo-500"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-gray-600 font-medium">Upload file</span>
                </label>
                <input
                  id="upload"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setSrc(e.target.files[0]);
                    }
                  }}
                />
              </div>
            )}
            {src && <h1>{src.name}</h1>}
            <Button onClick={submitSrc} className="mt-2">
              Update source
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ChangePosterSrcDialog;
