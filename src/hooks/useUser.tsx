import UserController, {
  IResponseUserConfirmed,
  IUserController,
} from "@/controllers/user.controller";
import http from "@/lib/http";
import { create } from "zustand";
interface IUseUser {
  getUserConfirmed(userId: number | string): Promise<IResponseUserConfirmed>;
}
const useUser = create<IUseUser>((set) => {
  const userController: IUserController = new UserController(http);
  return {
    getUserConfirmed: async (userId: number | string) => {
      return await userController.getUserConfirmed(userId);
    },
  };
});
export default useUser;