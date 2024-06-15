"use client";
import { Category } from "@/interfaces/category.i";
import ForEach from "@/lib/foreach-component";
import React, { FC } from "react";
import { useToast } from "@/components/ui/use-toast";
import { IUseCountryDelete, IUseCountryUpdate } from "@/hooks/useCountry";
import { Country } from "@/interfaces/country.i";
import { Report } from "@/interfaces/report.i";
import HandleDialog from "./handle";

interface IReportsTableProps {
  reports: Array<Report>;
  initReports(): Promise<void>;
  checked: boolean;
  handleReport(
    data: { id: number; reply: string },
    toast: (message: string) => void
  ): Promise<void>;
}
const ReportsTable: FC<IReportsTableProps> = ({
  reports,
  initReports,
  checked,
  handleReport,
}) => {
  const { toast } = useToast();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-200">
      <div className="overflow-y-auto max-h-[50vh]">
        <table className="w-full text-sm text-left rtl:text-right  ">
          <thead className="text-xs text-p3 uppercase bg-p1 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Report Id
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                Create at
              </th>
              {!checked ? (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            <ForEach
              list={reports}
              render={(item: Report) => (
                <tr className="bg-p1 border-b hover:bg-neutral-900 transition-all">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4 font-semibold">{item.email}</td>
                  <td className="px-6 py-4 font-semibold">{item.content}</td>
                  <td className="px-6 py-4 font-semibold">{item.createdAt}</td>
                  {!checked ? (
                    <td className="px-6 py-4">
                      <div>
                        <HandleDialog
                          initReports={initReports}
                          report={item}
                          handleReport={handleReport}
                        />
                      </div>
                    </td>
                  ) : null}
                </tr>
              )}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsTable;
