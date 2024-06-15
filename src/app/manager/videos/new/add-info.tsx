"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useCategory from "@/hooks/useCategory";
import useCountry from "@/hooks/useCountry";
import { Category } from "@/interfaces/category.i";
import { Country } from "@/interfaces/country.i";
import { IDataNewInformation } from "@/interfaces/video.i";
import ForEach from "@/lib/foreach-component";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const infoVideo = Joi.object({
  name: Joi.string().required().min(5),
  description: Joi.string().required().min(8),
  tag: Joi.string().required(),
  release: Joi.date().required(),
  isVip: Joi.boolean().required(),
  isPublic: Joi.boolean().required(),
  categoryId: Joi.number().required(),
  countryId: Joi.number().required(),
});
interface IAddInfoVideoContainerProps {
  data: IDataNewInformation | null;
  onSubmitData: (data: IDataNewInformation) => void;
}
const AddInfoVideoContainer: FC<IAddInfoVideoContainerProps> = ({
  onSubmitData,
  data,
}) => {
  const [resource, setResource] = useState<{
    categories: Array<Category>;
    countries: Array<Country>;
  }>({
    categories: [],
    countries: [],
  });
  const { getCategories } = useCategory();
  const { getCountries } = useCountry();
  const init = async () => {
    const [categories, countries] = await Promise.all([
      getCategories(),
      getCountries(),
    ]);
    setResource({
      categories,
      countries,
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataNewInformation>({
    resolver: joiResolver(infoVideo),
  });
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="overflow-y-auto max-h-[88vh] p-2">
      <h1 className="font-bold text-2xl">New video information</h1>
      <form
        onSubmit={handleSubmit(onSubmitData)}
        method="post"
        className="space-y-3"
      >
        <div>
          <Label>Video name</Label>
          <Input {...register("name")} value={data?.name} />
          {errors?.name ? (
            <p className="text-red-400">{errors?.name?.message}</p>
          ) : null}
        </div>
        <div>
          <Label>Category</Label>
          <select
            {...register("categoryId")}
            className="bg-p2 w-full ring-1 hover:ring-2 focus:ring-2 ring-white h-14 rounded-md p-2"
          >
            <ForEach
              list={resource.categories}
              render={(item: Category) => (
                <option value={`${item.id}`} className="font-bold">
                  {item.name}
                </option>
              )}
            />
          </select>
          {errors?.categoryId ? (
            <p className="text-red-400">{errors?.categoryId?.message}</p>
          ) : null}
        </div>
        <div>
          <Label>Country</Label>
          <select
            {...register("countryId")}
            className="bg-p2 w-full ring-1 hover:ring-2 focus:ring-2 ring-white h-14 rounded-md p-2"
          >
            <ForEach
              list={resource.countries}
              render={(item: Country) => (
                <option value={`${item.id}`} className="font-bold">
                  {item.name}
                </option>
              )}
            />
          </select>
          {errors?.countryId ? (
            <p className="text-red-400">{errors?.countryId?.message}</p>
          ) : null}
        </div>
        <div>
          <Label>Tag</Label>
          <Input {...register("tag")} value={data?.tag} />
          {errors?.tag ? (
            <p className="text-red-400">{errors?.tag?.message}</p>
          ) : null}
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            {...register("description")}
            className="bg-p2"
            value={data?.description}
          />
          {errors?.description ? (
            <p className="text-red-400">{errors?.description?.message}</p>
          ) : null}
        </div>
        <div>
          <Label>Release</Label>
          <Input type="datetime-local" {...register("release")} />
          {errors?.release ? (
            <p className="text-red-400">{errors?.release?.message}</p>
          ) : null}
        </div>
        <div className="flex justify-start items-center gap-5 ">
          <div className="flex justify-start items-center gap-2">
            <Label>Vip</Label>
            <Input type="checkbox" {...register("isVip")} className="w-5 h-5" />
          </div>
          <div className="flex justify-start items-center gap-2">
            <Label>Public</Label>
            <Input
              type="checkbox"
              {...register("isPublic")}
              className="w-5 h-5"
            />
          </div>
        </div>
        <p className="text-sm text-zinc-400">
          When you choose to make it public, everyone will have the right to
          view your uploaded video. When choosing to be VIP, only the VIP
          account has the right to view your video with the prerequisite that
          your video is public.
        </p>
        <div>
          <Button className="hover:bg-p3_2 bg-p1 h-10 px-8" type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddInfoVideoContainer;
