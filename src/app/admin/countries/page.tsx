"use client";
import useCountry from "@/hooks/useCountry";
import { Country } from "@/interfaces/country.i";
import React, { lazy, Suspense, useEffect, useState } from "react";
import CreateDialog from "./create-dialog";
import { TbReload } from "react-icons/tb";
const CountriesTable = lazy(() => import("./table"));
const Countries = () => {
  const [countries, setCountries] = useState<Array<Country>>([]);
  const { getCountries, create, deleteById, update } = useCountry();
  const init = async () => {
    const cons = await getCountries();
    setCountries(cons);
  };
  useEffect(() => {
    init();
  });
  return (
    <div>
      <h1 className="font-bold text-xl">Country manager</h1>
      <div className="flex justify-start items-center gap-2 my-3">
        <CreateDialog initCountries={init} create={create} />
        <button
          className="flex justify-start items-center gap-1 bg-p1 p-2 rounded-md hover:underline"
          onClick={async () => {
            await init();
          }}
        >
          <TbReload />
          <span>Reload</span>
        </button>
      </div>
      <Suspense>
        <CountriesTable
          initCountries={init}
          countries={countries}
          deleteById={deleteById}
          update={update}
        />
      </Suspense>
    </div>
  );
};

export default Countries;
