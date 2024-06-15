"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { IUseCountryUpdate } from "@/hooks/useCountry";
import useUser from "@/hooks/useUser";
import { Category } from "@/interfaces/category.i";
import { Country } from "@/interfaces/country.i";
import { FC, useState } from "react";

interface IConfirmDialog {}
const ConfirmDialog: FC<IConfirmDialog> = ({}) => {
  const { toast } = useToast();
  const [username, setUsername] = useState<string>("");
  const { confirmUser } = useUser();
  const submit = async () => {
    if (username.length < 0) {
      toast({
        title: "Username is required",
      });
    } else {
      await confirmUser(username, (message) => {
        toast({
          title: message,
        });
      });
      setUsername("");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex justify-start items-center gap-1 bg-p3 p-2 rounded-md hover:underline font-bold">
          Confirm User
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-p1">
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label>Username</Label>
            <Input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <div className="flex justify-end items-center">
              <button
                className="bg-p3_2 p-2 rounded-md font-bold"
                onClick={submit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmDialog;
