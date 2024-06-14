"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ICreateCategoryDto } from "@/controllers/category.controller";
import useCategory from "@/hooks/useCategory";
import { Category } from "@/interfaces/category.i";
import { FC, useState } from "react";
import { TbNewSection } from "react-icons/tb";

interface ICreateDialog {
  create(
    data: ICreateCategoryDto,
    toast: (message: string) => void
  ): Promise<void>;
  initCategories(): Promise<void>;
}
const CreateDialog: FC<ICreateDialog> = ({ create, initCategories }) => {
  const { toast } = useToast();
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const createSubmit = async () => {
    if (name.length > 0 && file !== null) {
      await create(
        {
          name: name,
          file: file,
        },
        (message) => {
          toast({
            title: message,
          });
        }
      );
      await initCategories();
      setName("");
      setFile(null);
      return;
    }
    if (name.length < 0) {
      toast({
        title: "Name is required",
      });
    }
    if (file === null) {
      toast({
        title: "Image is required",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="font-bold bg-p3_2 p-2 rounded-md  hover:underline flex justify-start items-center gap-1 ">
          <TbNewSection />
          <span>New categery</span>
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
            <div>
              <Label>Image</Label>
              <Input
                required
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
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
