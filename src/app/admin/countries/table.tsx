"use client";
import { Category } from "@/interfaces/category.i";
import ForEach from "@/lib/foreach-component";
import React, { FC } from "react";
import { useToast } from "@/components/ui/use-toast";
import EditDialog from "./edit-dialog";
import { IUseCountryDelete, IUseCountryUpdate } from "@/hooks/useCountry";
import { Country } from "@/interfaces/country.i";

interface ICountriesTableProps extends IUseCountryDelete, IUseCountryUpdate {
  countries: Array<Country>;
  initCountries(): Promise<void>;
}

const CountriesTable: FC<ICountriesTableProps> = ({
  countries,
  deleteById,
  update,
  initCountries,
}) => {
  const { toast } = useToast();
  const remove = async (category: Category) => {
    await deleteById(category.id, (message) => {
      toast({
        title: message,
      });
    });
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-200">
      <div className="overflow-y-auto max-h-[70vh]">
        <table className="w-full text-sm text-left rtl:text-right  ">
          <thead className="text-xs text-p3 uppercase bg-p1 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category Id
              </th>
              <th scope="col" className="px-6 py-3">
                Category name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <ForEach
              list={countries}
              render={(item: Category) => (
                <tr className="bg-p1 border-b hover:bg-neutral-900 transition-all">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4 font-semibold">{item.name}</td>
                  <td className="px-6 py-4">
                    <div>
                      <EditDialog country={item} update={update} />
                      <button
                        className="font-medium text-red-600  hover:underline ms-3 hover:font-bold"
                        onClick={async () => {
                          await remove(item);
                          await initCountries();
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountriesTable;
