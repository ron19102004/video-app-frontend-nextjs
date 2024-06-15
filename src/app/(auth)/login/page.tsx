"use client";
import { Input } from "@/components/ui/input";
import { LoginRequest } from "@/interfaces/user.i";
import { cn } from "@/lib/utils";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import COOKIES_CONSTANT from "@/interfaces/cookies-constant.i";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import InputOTPControlled from "./otp";

const loginScheme = Joi.object({
  username: Joi.string().required().min(5),
  password: Joi.string().required().min(8),
});
const Login: React.FC = () => {
  const router = useRouter();
  const useAuth = use(AuthContext);
  const [otp, setOtp] = useState<{
    isOpen: boolean;
    token: string;
  }>({
    isOpen: false,
    token: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: joiResolver(loginScheme),
  });
  const onSubmit = (data: LoginRequest) => {
    useAuth.login(
      data,
      (href: string) => {
        router.push(href);
      },
      (token) => {
        setOtp({ ...otp, isOpen: true, token: token });
      }
    );
  };
  const { toast } = useToast();
  useEffect(() => {
    if (useAuth.isAuth) {
      toast({
        title: "You are already logged in",
      });
      router.push("/");
    }
    const token = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (token) {
      useAuth.checkAuthentication();
    }
  }, [useAuth.isAuth]);
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
          <h1 className="font-bold text-2xl">Login</h1>
        </div>
        <hr />
        <div>
          <Label>Username</Label>
          <Input
            type="text"
            {...register("username")}
            placeholder="user@example.com or user2024"
          />
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
          Sign In
        </Button>
        <p className="text-center ">
          You don&apos;t have an account?{" "}
          <Link href={"/register"}>Register</Link>
        </p>
      </form>
      <div>
        <Dialog
          open={otp.isOpen}
          onOpenChange={(value: boolean) => {
            setOtp({ ...otp, isOpen: value });
          }}
        >
          <DialogContent className="sm:max-w-[425px] bg-p1">
            <div className="grid gap-4 py-4">
              <InputOTPControlled token={otp.token} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Login;
