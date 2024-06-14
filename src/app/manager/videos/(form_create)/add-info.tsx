"use client";
import { IDataNewInformation } from "@/interfaces/video.i";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
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
const AddInfoVideoContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataNewInformation>({
    resolver: joiResolver(infoVideo),
  });
  return <div></div>;
};

export default AddInfoVideoContainer;
