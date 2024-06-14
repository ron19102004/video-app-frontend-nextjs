import { IRequest } from "@/interfaces";
import { Category } from "@/interfaces/category.i";
import COOKIES_CONSTANT from "@/interfaces/cookies-constant.i";
import { API, Http, IResponseLayout } from "@/lib/http";
import Cookies from "js-cookie";

export interface ICreateCategoryDto {
  name: string;
  file: File;
}
export interface IChangeImageDto extends Omit<ICreateCategoryDto, "name"> {
  id: number;
}
export interface IChangeNameDto extends Omit<ICreateCategoryDto, "file"> {
  id: number;
}
export interface ICategoryController {
  getCategories(): Promise<Array<Category>>;
  create(request: IRequest<ICreateCategoryDto, null, any>): Promise<void>;
  changeName(request: IRequest<IChangeNameDto, null, any>): Promise<void>;
  changeImage(request: IRequest<IChangeImageDto, null, any>): Promise<void>;
  delete(request: IRequest<{ id: number }, null, any>): Promise<void>;
}
export default class CategoryController implements ICategoryController {
  private CategoryURL = API.CategoryURL;
  private http: Http;
  constructor(http: Http) {
    this.http = http;
  }
  async getCategories(): Promise<Array<Category>> {
    const response = await this.http.get<Array<Category>>(
      this.CategoryURL.GET_ALL
    );
    return response.data;
  }
  async create(
    request: IRequest<ICreateCategoryDto, null, any>
  ): Promise<void> {
    const token = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!token) {
      request.error("Access token not found");
      return;
    }
    const data = new FormData();
    data.append("name", request.data.name);
    data.append("file", request.data.file);
    const response = await this.http.post<IResponseLayout<any>>(
      this.CategoryURL.CREATE,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status) {
      request.success(null);
    } else {
      request.error(response.data.message);
    }
  }
  async changeImage(
    request: IRequest<IChangeImageDto, null, any>
  ): Promise<void> {
    const token = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!token) {
      request.error("Access token not found");
      return;
    }
    const data = new FormData();
    data.append("file", request.data.file);
    const response = await this.http.patch<IResponseLayout<any>>(
      this.CategoryURL.UPDATE_IMAGE(request.data.id),
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status) {
      request.success(null);
    } else {
      request.error(response.data.message);
    }
  }
  async changeName(
    request: IRequest<IChangeNameDto, null, any>
  ): Promise<void> {
    const token = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!token) {
      request.error("Access token not found");
      return;
    }
    const data = new FormData();
    data.append("name", request.data.name);
    const response = await this.http.patch<IResponseLayout<any>>(
      this.CategoryURL.UPDATE_NAME(request.data.id),
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status) {
      request.success(null);
    } else {
      request.error(response.data.message);
    }
  }
  async delete(request: IRequest<{ id: number }, null, any>): Promise<void> {
    const token = Cookies.get(COOKIES_CONSTANT.ACCESS_TOKEN);
    if (!token) {
      request.error("Access token not found");
      return;
    }
    const response = await this.http.delete<IResponseLayout<any>>(
      this.CategoryURL.DELETE(request.data.id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status) {
      request.success(null);
    } else {
      request.error(response.data.message);
    }
  }
}
