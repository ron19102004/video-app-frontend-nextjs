import UserController, {
  IResponseUserConfirmed,
  IUserController,
} from "@/controllers/user.controller";
import { SubscribeInfo } from "@/interfaces/user.i";
import http from "@/lib/http";
import { create } from "zustand";
interface IUseUser {
  getUserConfirmed(userId: number | string): Promise<IResponseUserConfirmed>;
  subscribe(
    subscriberId: number | string,
    toast: (message: string) => void
  ): Promise<void>;
  unsubscribe(
    un_subscriberId: number | string,
    toast: (message: string) => void
  ): Promise<void>;
  confirmUser(
    username: string,
    toast: (message: string) => void
  ): Promise<void>;
  getSubscribedUser(userId:number): Promise<SubscribeInfo>
}
const useUser = create<IUseUser>(() => {
  const userController: IUserController = new UserController(http);
  return {
    getSubscribedUser: async (userId:number): Promise<SubscribeInfo> => {
      return await userController.getSubscribeUser(userId);
    },
    getUserConfirmed: async (userId: number | string) => {
      return await userController.getUserConfirmed(userId);
    },
    subscribe: async (
      subscriberId: number | string,
      toast: (message: string) => void
    ) => {
      await userController.subscribe({
        data: { subscriberId: subscriberId },
        success() {
          toast("Subscribed successfully");
        },
        error(err) {
          console.log(err);
          toast("Error subscribing!!!");
        },
      });
    },
    unsubscribe: async (
      un_subscriberId: number | string,
      toast: (message: string) => void
    ) => {
      await userController.unsubscribe({
        data: { un_subscriberId: un_subscriberId },
        success() {
          toast("Unsubscribed successfully");
        },
        error(err) {
          console.log(err);
          toast("Error unsubscribing!!!");
        },
      });
    },
    confirmUser: async (username: string, toast: (message: string) => void) => {
      await userController.confirmUser({
        data: { username: username },
        success() {
          toast("User confirmed successfully");
        },
        error(err) {
          console.log(err);
          toast("Error confirming user!!!");
        },
      });
    },
  };
});
export default useUser;
