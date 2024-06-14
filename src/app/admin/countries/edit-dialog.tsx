"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { IUseCountryUpdate } from "@/hooks/useCountry";
import { Category } from "@/interfaces/category.i";
import { Country } from "@/interfaces/country.i";
import { FC, useState } from "react";

interface IEditDialog extends IUseCountryUpdate {
  country: Country;
}
const EditDialog: FC<IEditDialog> = ({ country, update }) => {
  const { toast } = useToast();
  const [name, setName] = useState<string>(country.name);
  const updateSubmit = async () => {
    if (name.length < 0) {
      toast({
        title: "Name is required",
      });
    } else {
      await update(country.id, name, (message) => {
        toast({
          title: message,
        });
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="font-medium text-blue-600  hover:underline hover:font-bold">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-p1">
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="flex justify-end items-center">
              <button
                className="bg-p3_2 p-2 rounded-md font-bold"
                onClick={updateSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default EditDialog;
