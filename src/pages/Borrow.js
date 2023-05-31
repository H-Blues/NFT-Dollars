import React, { useEffect } from "react";
import ExtractionCard from "../components/card/extraction";
import StabilityCard from "../components/card/stabilityPoolCard";
import StakeCard from "../components/card/stakeCard";
import Dashboard from "../components/statistics/dashboard";

const Borrow = () => {
  useEffect(() => {
    const handleResize = () => {
      document.body.style.paddingBottom = "100vh";
      if (window.innerWidth > 1024) {
        document.body.style.paddingBottom = "60vh";
      }
    };
    window.addEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return (
    <div className="grid xl:grid-cols-3">
      <div className="col-span-2">
        <ExtractionCard />
        <StabilityCard />
        <StakeCard />
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Dashboard />
      </div>
    </div>
  );
};

export default Borrow;
