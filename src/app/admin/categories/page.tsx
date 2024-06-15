"use client";
import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import useCategory from "@/hooks/useCategory";
import { Category } from "@/interfaces/category.i";
import CreateDialog from "./create-dialog";
import { TbReload } from "react-icons/tb";

const CategoriesTable = lazy(() => import("./table"));
const Categories = () => {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const { getCategories, changeImage, changeName, deleteById, create } =
    useCategory();
  const init = async () => {
    const cates = await getCategories();
    setCategories(cates);
  };
  useEffect(() => {
    init();
  }, [init]);
  return (
    <div>
      <h1 className="font-bold text-xl">Category manager</h1>
      <div className="flex justify-start items-center gap-2 my-3">
        <CreateDialog create={create} initCategories={init} />
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
        <CategoriesTable
          initCategories={init}
          categories={categories}
          changeImage={changeImage}
          changeName={changeName}
          deleteById={deleteById}
        />
      </Suspense>
    </div>
  );
};

export default Categories;
