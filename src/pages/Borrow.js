import React, { useEffect } from "react";
import ExtractionCard from "../components/card/extractionCard";
import StabilityCard from "../components/card/stabilityPoolCard";
// import StakeCard from "../components/card/stakeCard";
import Dashboard from "../components/statistics/dashboard";

const Borrow = () => {
  useEffect(() => {
    const handleResize = () => {
      const paddingBottom = window.innerWidth > 1024 ? "60vh" : "80vh";
      document.body.style.paddingBottom = paddingBottom;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid xl:grid-cols-3">
      <div className="col-span-2">
        <ExtractionCard />
        <StabilityCard />
        {/* <StakeCard /> */}
      </div>
      <div className="col-span-2 xl:col-span-1">
        <Dashboard />
      </div>
    </div>
  );
};

export default Borrow;
