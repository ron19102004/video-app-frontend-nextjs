import { create } from "zustand";
import ReportController, {
  IReportController,
} from "../controllers/report.controller";
import http from "@/lib/http";
import { Report } from "@/interfaces/report.i";
interface IUseReport {
  pushReport(
    data: { email: string; content: string },
    toast: (message: string) => void
  ): Promise<void>;
  getReportsChecked(): Promise<Array<Report>>;
  getReportsCheckedYet(): Promise<Array<Report>>;
  handleReport(
    data: { id: number; reply: string },
    toast: (message: string) => void
  ): Promise<void>;
}
const useReport = create<IUseReport>(() => {
  const reportController: IReportController = new ReportController(http);
  return {
    getReportsChecked: async () => {
      return await reportController.getReportsChecked();
    },
    getReportsCheckedYet: async () => {
      return await reportController.getReportsNotChecked();
    },
    handleReport: async (
      data: { id: number; reply: string },
      toast: (message: string) => void
    ) => {
      await reportController.handleReport({
        data: data,
        error(err) {
          toast("Error processing report");
        },
        success() {
          toast("Report handled successfully");
        },
      });
    },
    pushReport: async (
      data: { email: string; content: string },
      toast: (message: string) => void
    ) => {
      await reportController.pushReport({
        data: data,
        error(err) {
          toast("Error pushing report");
        },
        success() {
          toast("Report pushed successfully");
        },
      });
    },
  };
});
export default useReport