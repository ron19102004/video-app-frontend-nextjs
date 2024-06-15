"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { IUseCountryUpdate } from "@/hooks/useCountry";
import { IUseVideoManagerChangePrivacy } from "@/hooks/useVideoManager";
import { Category } from "@/interfaces/category.i";
import { Country } from "@/interfaces/country.i";
import { Privacy } from "@/interfaces/user.i";
import { Video } from "@/interfaces/video.i";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
interface IChangePrivacyDto {
  isPublic: boolean;
  isVip: boolean;
}
const changePrivacy = Joi.object({
  isPublic: Joi.boolean().required(),
  isVip: Joi.boolean().required(),
});
interface IChangePrivacyDialog extends IUseVideoManagerChangePrivacy {
  video: Video;
}
const ChangePrivacyDialog: FC<IChangePrivacyDialog> = ({
  video,
  changePrivacyVip,
}) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePrivacyDto>({
    resolver: joiResolver(changePrivacy),
  });
  const onSubmit = async (data: IChangePrivacyDto) => {
    await changePrivacyVip(
      {
        id: video.id,
        isPublic: data.isPublic,
        isVip: data.isVip,
      },
      (mess) => {
        toast({
          title: mess,
        });
      }
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-blue-700 px-3 h-full py-2 rounded-md  hover:underline">
          Privacy
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-p1">
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-start items-center gap-5 ">
                <div className="flex justify-start items-center gap-2">
                  <Label>Vip</Label>
                  <Input
                    type="checkbox"
                    {...register("isVip")}
                    className="w-8 h-8"
                  />
                </div>
                <div className="flex justify-start items-center gap-2">
                  <Label>Public</Label>
                  <Input
                    type="checkbox"
                    {...register("isPublic")}
                    className="w-8 h-8"
                  />
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="bg-p3_2 p-2 rounded-md font-bold"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ChangePrivacyDialog;
