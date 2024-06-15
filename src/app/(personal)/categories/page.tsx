"use client";
import useCategory from "@/hooks/useCategory";
import { Category } from "@/interfaces/category.i";
import ForEach from "@/lib/foreach-component";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Categories = () => {
  const [categories, setCategories] = React.useState<Array<Category>>([]);
  const { getCategories } = useCategory();
  const init = async () => {
    const cates = await getCategories();
    setCategories(cates);
  };
  React.useEffect(() => {
    init();
  }, []);
  return (
    <div className="p-3">
      <h1 className="font-bold text-xl mb-3">Categories</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <ForEach
          list={categories}
          render={(item: Category) => {
            return (
              <div>
                <div className="w-full h-48 overflow-hidden rounded-xl">
                  <Link href={"/search?category_id=" + item.id}>
                    <Image
                      src={item?.image ?? ""}
                      alt={item.name}
                      width={500}
                      height={500}
                      className="w-full h-48 object-cover rounded-xl hover:scale-125 transition-all "
                    />
                  </Link>
                </div>
                <div className="">
                  <Link
                    href={"/search?category_id=" + item.id}
                    className="font-bold text-xl text-center hover:text-p3"
                  >
                    {item.name}
                  </Link>
                </div>
              </div>
            );
          }}
        />
      </ul>
    </div>
  );
};

export default Categories;
