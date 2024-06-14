"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/authContext";
import { RegisterRequest } from "@/interfaces/user.i";
import { cn } from "@/lib/utils";
import { joiResolver } from "@hookform/resolvers/joi";
import { Label } from "@radix-ui/react-label";
import Joi from "joi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import { useForm } from "react-hook-form";

const registerScheme = Joi.object({
  username: Joi.string().required().min(5),
  password: Joi.string().required().min(8),
  email: Joi.string().required(),
  fullName: Joi.string().required().min(5),
  phone: Joi.string().required().min(10).max(11),
});
const Register: React.FC = () => {
  const router = useRouter();
  const useAuth = use(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: joiResolver(registerScheme),
  });
  const onSubmit = (data: RegisterRequest) => {
    useAuth.register(data, (href: string) => {
      router.push(href);
    });
  };
  return (
    <div
      className={cn(
        "bg-p2 px-4 py-2 2xl:w-[500px] xl:w-[450px] lg:w-[400px] rounded-lg shadow-lg"
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2"
        method="post"
      >
        <div>
          <h1 className="font-bold text-2xl">Register</h1>
        </div>
        <hr />
        <div>
          <Label>Username</Label>
          <Input type="text" {...register("username")} placeholder="user2024" />
        </div>
        <div>
          <Label>Full name</Label>
          <Input type="text" {...register("fullName")} placeholder="Tran A" />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            {...register("email")}
            placeholder="user1@example.com"
          />
        </div>
        <div>
          <Label>Phone number</Label>
          <Input type="tel" {...register("phone")} placeholder="0392477***" />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            {...register("password")}
            placeholder="********"
          />
        </div>
        <Button
          type="submit"
          className="h-14 px-6 bg-p3_2 hover:bg-p3 w-full text-md font-semibold"
        >
          Sign Up
        </Button>
        <p className="text-center ">
          You already have an account? <Link href={"/login"}>Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
