"use client";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { SlMagnifier } from "react-icons/sl";

const SearchBar = () => {
  const [query, setQuery] = React.useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const init = () => {
    const q = Object.fromEntries(searchParams.entries());
    setQuery(q.name ?? "");
  };
  React.useEffect(() => {
    init();
  }, [searchParams]);
  const onClick = () => {
    if (query.length > 0) {
      router.push("/search?name=" + query);
    }
  };
  return (
    <div className="flex space-x-[0.8px]">
      <input
        placeholder="Search..."
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClick();
          }
        }}
        className=" w-72 lg:w-80 xl:w-96 h-10 pl-3 rounded-s-full bg-p1 outline-none hover:ring-1 focus:ring-1 ring-p3_2"
      />
      <button
        className="flex flex-col justify-center items-center bg-p1 px-4 rounded-e-full hover:bg-p3_2"
        onClick={onClick}
      >
        <SlMagnifier />
      </button>
    </div>
  );
};

export default SearchBar;
