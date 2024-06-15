"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { IUseCountryUpdate } from "@/hooks/useCountry";
import { Category } from "@/interfaces/category.i";
import { Country } from "@/interfaces/country.i";
import { Report } from "@/interfaces/report.i";
import { FC, useState } from "react";

interface IHandleDialog {
  report: Report;
  handleReport(
    data: { id: number; reply: string },
    toast: (message: string) => void
  ): Promise<void>;
  initReports(): Promise<void>;
}
const HandleDialog: FC<IHandleDialog> = ({
  handleReport,
  report,
  initReports,
}) => {
  const { toast } = useToast();
  const [reply, setReply] = useState<string>("");
  const replySubmit = async () => {
    if (reply.length > 0) {
      await handleReport(
        {
          id: report.id,
          reply: reply,
        },
        (message) => {
          toast({
            title: message,
          });
        }
      );
      setReply("");
      await initReports();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="font-medium text-blue-600  hover:underline hover:font-bold">
          Reply
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-p1">
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label className="text-p3">Reply content to {report.email}</Label>
            <p className="text-sm ">Content: {report.content}</p>
            <Textarea
              className="bg-p1 h-52"
              value={reply}
              onChange={(e) => {
                setReply(e.target.value);
              }}
            />
            <div className="flex justify-end items-center">
              <button
                className="bg-p3_2 p-2 rounded-md font-bold"
                onClick={replySubmit}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default HandleDialog;
