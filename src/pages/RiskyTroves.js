import React, { useEffect } from "react";
import TransactionTable from "../components/table";
import Dashboard from "../components/statistics/dashboard";

const RiskyTroves = () => {
  useEffect(() => {
    const handleResize = () => {
      const paddingBottom = window.innerWidth > 1024 ? "60vh" : "80vh";
      document.body.style.paddingBottom = paddingBottom;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid xl:grid-cols-3 gap-4 justify-center">
      <div className="col-span-2 ml-6 mt-16 ">
        <TransactionTable />
      </div>
      <div className="col-span-2 xl:col-span-1 mt-6">
        <Dashboard />
      </div>
    </div>
  );
};

export default RiskyTroves;
