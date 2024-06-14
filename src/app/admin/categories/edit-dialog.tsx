"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import useCategory, { IUseCategoryUpdate } from "@/hooks/useCategory";
import { Category } from "@/interfaces/category.i";
import { FC, useState } from "react";

interface IEditDialog extends IUseCategoryUpdate {
  category: Category;
}
const EditDialog: FC<IEditDialog> = ({ category,changeImage,changeName }) => {
  const { toast } = useToast();
  const [name, setName] = useState<string>(category.name);
  const [file, setFile] = useState<File | null>(null);
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
                onClick={() => {
                  changeName(
                    {
                      name: name,
                      id: category.id,
                    },
                    (message) => {
                      toast({
                        title: message,
                      });
                    }
                  );
                }}
              >
                Save name
              </button>
            </div>
          </div>
          <hr />
          <div className="space-y-1">
            <Label>Image</Label>
            <Input
              className="text-white"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            <div className="flex justify-end items-center">
              <button
                className="bg-p3_2 p-2 rounded-md font-bold"
                onClick={() => {
                  if (file !== null) {
                    changeImage(
                      {
                        id: category.id,
                        file: file,
                      },
                      (message) => {
                        toast({
                          title: message,
                        });
                      }
                    );
                  } else {
                    toast({
                      title: "File image error !",
                    });
                  }
                }}
              >
                Save image
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default EditDialog;
