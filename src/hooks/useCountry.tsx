import CountryController, {
  ICountryController,
} from "@/controllers/country.controller";
import { Country } from "@/interfaces/country.i";
import http from "@/lib/http";
import { create } from "zustand";
export interface IUseCountryCreate {
  create(name: string, toast: (message: string) => void): Promise<void>;
}
export interface IUseCountryUpdate {
  update(
    id: number,
    name: string,
    toast: (message: string) => void
  ): Promise<void>;
}
export interface IUseCountryDelete {
  deleteById(id: number, toast: (message: string) => void): Promise<void>;
}
export interface IUseCountry
  extends IUseCountryCreate,
    IUseCountryUpdate,
    IUseCountryDelete {
  getCountries(): Promise<Array<Country>>;
}
const useCountry = create<IUseCountry>(() => {
  const countryController: ICountryController = new CountryController(http);
  return {
    getCountries: async () => {
      return await countryController.getCountries();
    },
    create: async (name: string, toast: (message: string) => void) => {
      await countryController.create({
        error(err) {
          console.log(err);
          toast("Error creating country!");
        },
        success() {
          toast("Create country successfully!");
        },
        data: { name: name },
      });
    },
    update: async (
      id: number,
      name: string,
      toast: (message: string) => void
    ) => {
      await countryController.update({
        error(err) {
          console.log(err);
          toast("Error updating country");
        },
        success() {
          toast("Update country successfully!");
        },
        data: { id: id, name: name },
      });
    },
    deleteById: async (id: number, toast: (message: string) => void) => {
      await countryController.delete({
        error(err) {
          toast(err);
        },
        success() {
          toast("Delete country successfully!");
        },
        data: { id: id },
      });
    },
  };
});
export default useCountry;
