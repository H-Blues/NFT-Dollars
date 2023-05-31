import React, { useEffect } from "react";
import TransactionTable from "../components/table/transactionTable";
import Dashboard from "../components/statistics/dashboard";

const RiskyTroves = () => {
  useEffect(() => {
    const handleResize = () => {
      document.body.style.paddingBottom = "100vh";
      if (window.innerWidth > 1024) {
        document.body.style.paddingBottom = "60vh";
      }
    };
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
