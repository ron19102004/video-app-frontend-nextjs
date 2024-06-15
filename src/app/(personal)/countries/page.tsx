"use client";
import useCategory from "@/hooks/useCategory";
import useCountry from "@/hooks/useCountry";
import { Category } from "@/interfaces/category.i";
import { Country } from "@/interfaces/country.i";
import ForEach from "@/lib/foreach-component";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const colors: Array<string> = [
  "#9B3922",
  "#435585",
  "#005B41",
  "#116D6E",
  "#0E8388",
  "#810CA8",
  "#3F4E4F",
  "#C84B31",
  "#362222",
];
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const Countries = () => {
  const [countries, setCountries] = React.useState<Array<Country>>([]);
  const { getCountries } = useCountry();
  const init = async () => {
    const couns = await getCountries();
    setCountries(couns);
  };
  React.useEffect(() => {
    init();
  }, []);
  return (
    <div className="p-3">
      <h1 className="font-bold text-xl mb-3">Countries</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <ForEach
          list={countries}
          render={(item: Category) => {
            return (
              <Link
                style={{ backgroundColor: getRandomColor() }}
                href={"/search?country_id=" + item.id}
                className="font-bold text-xl text-center hover:text-p3 h-32 md:h-52 rounded-lg w-full flex flex-col justify-center items-center"
              >
                <h1>{item.name}</h1>
              </Link>
            );
          }}
        />
      </ul>
    </div>
  );
};

export default Countries;
