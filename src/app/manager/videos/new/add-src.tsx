import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useState } from "react";

interface IVideoSourceUploadProps {
  className?: ClassValue;
  onChange: (file: File) => void;
  backTab: () => void;
  data: File | null;
}
const VideoSourceUpload: React.FC<IVideoSourceUploadProps> = ({
  className,
  onChange,
  backTab,
  data,
}) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(data);
  const submit = () => {
    if (file !== null) {
      if (["video/mp4"].includes(file.type)) {
        onChange(file);
      } else {
        toast({
          title: "Please select a video file with type is video/mp4",
        });
      }
    } else {
      toast({
        title: "Please select a file",
      });
    }
  };
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="font-bold text-2xl mb-2">Video source</h1>
      <div className={cn("rounded-md border border-gray-100  p-4 shadow-md")}>
        <label
          htmlFor="upload"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 fill-white stroke-indigo-500"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-gray-600 font-medium">Upload file</span>
        </label>
        <input
          id="upload"
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </div>
      {file && <h1>{file.name}</h1>}
      <div className="pt-3 flex gap-3">
        <Button className="hover:bg-p3_2 bg-p1 h-10 px-8" onClick={backTab}>
          Back
        </Button>
        <Button className="hover:bg-p3_2 bg-p1 h-10 px-8" onClick={submit}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default VideoSourceUpload;
