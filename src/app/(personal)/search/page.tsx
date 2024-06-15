"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import useSearchVideo from "../../../hooks/useSearchVideo";
import { Video } from "@/interfaces/video.i";
import ForEach from "@/lib/foreach-component";
import VideoCardSearch from "./video-card-search";

const SearchResult = () => {
  const [result, setResult] = React.useState<Array<Video>>([]);
  const { search } = useSearchVideo();
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState<string>("");
  const init = async () => {
    const query = Object.fromEntries(searchParams.entries());
    setQuery(query?.name ?? "");
    const cate_id = parseInt(query?.category_id || "0");
    const con_id = parseInt(query?.country_id || "0");
    const data = await search({
      name: query?.name,
      category_id: cate_id === 0 ? undefined : cate_id,
      country_id: con_id === 0 ? undefined : con_id,
    });
    setResult(data);
  };
  React.useEffect(() => {
    init();
  }, [searchParams]);
  return (
    <div className="p-3">
      <h1 className="font-bold text-xl">
        {result.length} results for &quot;{query}&quot;
      </h1>
      <ul className="space-y-8">
        <ForEach
          list={result}
          render={(item: Video) => <VideoCardSearch video={item} />}
        />
      </ul>
    </div>
  );
};

export default SearchResult;
