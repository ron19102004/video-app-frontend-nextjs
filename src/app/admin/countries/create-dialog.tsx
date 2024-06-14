"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ICreateCategoryDto } from "@/controllers/category.controller";
import useCategory from "@/hooks/useCategory";
import { IUseCountryCreate } from "@/hooks/useCountry";
import { Category } from "@/interfaces/category.i";
import { FC, useState } from "react";
import { TbNewSection } from "react-icons/tb";

interface ICreateDialog extends IUseCountryCreate {
  initCountries(): Promise<void>;
}
const CreateDialog: FC<ICreateDialog> = ({ create, initCountries }) => {
  const { toast } = useToast();
  const [name, setName] = useState<string>("");
  const createSubmit = async () => {
    if (name.length > 0) {
      await create(name, (message) => {
        toast({
          title: message,
        });
      });
      await initCountries();
      setName("");
      return;
    }
    if (name.length < 0) {
      toast({
        title: "Name is required",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="font-bold bg-p3_2 p-2 rounded-md  hover:underline flex justify-start items-center gap-1 ">
          <TbNewSection />
          <span>New country</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-p1">
        <form method="post">
          <div className="grid gap-4 py-4">
            <div>
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="bg-p3_2 p-2 rounded-md font-bold"
                onClick={async (e) => {
                  e.preventDefault();
                  await createSubmit();
                }}
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateDialog;
