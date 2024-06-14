import {
  ICategoryController,
  IChangeImageDto,
  IChangeNameDto,
  ICreateCategoryDto,
} from "@/controllers/category.controller";
import { create } from "zustand";
import CategoryController from "../controllers/category.controller";
import http from "@/lib/http";
import { Category } from "@/interfaces/category.i";
export interface IUseCategoryUpdate {
  changeName(
    data: IChangeNameDto,
    toast: (message: string) => void
  ): Promise<void>;
  changeImage(
    data: IChangeImageDto,
    toast: (message: string) => void
  ): Promise<void>;
}
export interface IUseCategoryDelete {
  deleteById(id: number, toast: (message: string) => void): Promise<void>;
}
interface IUseCategory extends IUseCategoryUpdate, IUseCategoryDelete {
  getCategories(): Promise<Array<Category>>;
  create(
    data: ICreateCategoryDto,
    toast: (message: string) => void
  ): Promise<void>;
}
const useCategory = create<IUseCategory>((set) => {
  const categoryController: ICategoryController = new CategoryController(http);
  return {
    getCategories: async () => {
      return await categoryController.getCategories();
    },
    create: async (
      data: ICreateCategoryDto,
      toast: (message: string) => void
    ) => {
      await categoryController.create({
        error(err) {
          toast(err);
        },
        success() {
          toast("Category created successfully");
        },
        data: data,
      });
    },
    changeName: async (
      data: IChangeNameDto,
      toast: (message: string) => void
    ) => {
      await categoryController.changeName({
        error(err) {
          toast(err);
        },
        success() {
          toast("Category name changed successfully");
        },
        data: data,
      });
    },
    changeImage: async (
      data: IChangeImageDto,
      toast: (message: string) => void
    ) => {
      await categoryController.changeImage({
        error(err) {
          toast(err);
        },
        success() {
          toast("Category image changed successfully");
        },
        data: data,
      });
    },
    deleteById: async (id: number, toast: (message: string) => void) => {
      await categoryController.delete({
        data: { id: id },
        error(err) {
          toast(err);
        },
        success() {
          toast("Category deleted successfully");
        },
      });
    },
  };
});
export default useCategory;
