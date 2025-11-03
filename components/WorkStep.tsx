import Register from "@/icons/Register";
import React, { PropsWithChildren } from "react";

const WorkStep = ({ stepContent, children }: any) => {
  return (
    <div className="step">
      <div className="icon bg-[var(--orange-color)] rounded-full w-[80px] h-[80px] flex justify-center items-center mx-auto">
        {children}
      </div>
      <h3 className="text-[var(--dark-color)] text-lg !leading-[28px] text-center font-semibold mt-6 mb-4">
        {stepContent?.title}
      </h3>
      <p className="text-[var(--gray-color)] text-[16px] text-center !leading-[24px]">
        {stepContent?.paragraph}
      </p>
    </div>
  );
};

export default WorkStep;
