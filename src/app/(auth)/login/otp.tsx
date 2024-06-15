"use client";

import * as React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AuthContext } from "@/contexts/authContext";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
interface IInputOTPControlled {
  token: string;
}
const InputOTPControlled: React.FC<IInputOTPControlled> = ({ token }) => {
  const [value, setValue] = React.useState("");
  const { toast } = useToast();
  const { verifyOTP } = React.use(AuthContext);
  const router = useRouter();
  return (
    <div className="space-y-2 flex flex-col justify-center items-center">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={async (value) => {
          setValue(value);
          if (value.length === 6) {
            await verifyOTP(
              { otp: value, token: token },
              (href) => {
                router.push(href);
              },
              (message) => {
                toast({
                  title: message,
                });
              }
            );
          }
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? <>Enter your OTP.</> : <>You entered: {value}</>}
      </div>
    </div>
  );
};
export default InputOTPControlled;
