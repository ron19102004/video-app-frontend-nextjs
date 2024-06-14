import { Category } from "./category.i";
import { Country } from "./country.i";
import { User } from "./user.i";

export interface Video {
  id: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  slug: string;
  duration: string;
  description: string;
  tag: string;
  deleted: boolean;
  release: string;
  vip: boolean;
  privacy: string;
  image: string;
  src: string;
  category: Category;
  country: Country;
  uploader: User;
}
export interface ISearchRequest {
  name: string | undefined;
  category_id: number | undefined;
  country_id: number | undefined;
}

export interface IDataNewInformation {
  categoryId: number;
  countryId: number;
  name: string;
  description: string;
  tag: string;
  release: Date;
  isVip: boolean;
  isPublic: boolean;
}
export interface IUploadPosterRequest {
  videoId: number;
  file: File;
}
export interface IUploadSourceRequest extends IUploadPosterRequest {}
