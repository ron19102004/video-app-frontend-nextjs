"use client";
import useReport from "@/hooks/useReport";
import { Report } from "@/interfaces/report.i";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { TbReload } from "react-icons/tb";
import ConfirmDialog from "./confirm-user";
const ReportsTable = lazy(() => import("./table"));
const Reports = () => {
  const [reports, setReports] = useState<{
    reportsChecked: Array<Report>;
    reportsCheckedYet: Array<Report>;
  }>({
    reportsChecked: [],
    reportsCheckedYet: [],
  });
  const { getReportsChecked, getReportsCheckedYet, handleReport } = useReport();
  const init = async () => {
    const [dataChecked, dataCheckedYet] = await Promise.all([
      getReportsChecked(),
      getReportsCheckedYet(),
    ]);
    setReports({
      reportsChecked: dataChecked,
      reportsCheckedYet: dataCheckedYet,
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="space-y-3">
      <div className="flex justify-start items-center gap-3">
        <ConfirmDialog />
        <button
          className="flex justify-start items-center gap-1 bg-p1 p-2 rounded-md hover:underline font-bold"
          onClick={init}
        >
          <TbReload />
          <span>Reload</span>
        </button>
      </div>
      <div className="">
        <h1 className="font-bold text-xl">Reports checked yet</h1>
        <Suspense fallback={<div>Loading report checked yet</div>}>
          <ReportsTable
            handleReport={handleReport}
            checked={false}
            initReports={init}
            reports={reports.reportsCheckedYet}
          />
        </Suspense>
      </div>
      <div className="">
        <h1 className="font-bold text-xl">Reports checked</h1>
        <Suspense fallback={<div>Loading report handled</div>}>
          <ReportsTable
            handleReport={handleReport}
            checked={true}
            initReports={init}
            reports={reports.reportsChecked}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Reports;
