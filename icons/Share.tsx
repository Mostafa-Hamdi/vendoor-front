// components/ShareIcon.tsx
import React from "react";

interface ShareIconProps {
  className?: string;
  fill?: string;
}

const Share: React.FC<ShareIconProps> = ({ className, fill = "#ffffff" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} w-[30px] h-[30px]`}
      aria-hidden="true"
      role="img"
    >
      <path
        fill={fill}
        d="M19.1,23.5c-2.4,0-4.3-1.9-4.4-4.3l-7.3-3.7c-0.8,0.6-1.6,0.8-2.6,0.8c-2.4,0-4.4-2-4.4-4.4
           c0-2.4,2-4.4,4.4-4.4c0.9,0,1.8,0.3,2.6,0.8l7.3-3.7c0-2.4,2-4.3,4.4-4.3c2.4,0,4.4,2,4.4,4.4c0,2.4-2,4.4-4.4,4.4
           c-0.9,0-1.8-0.3-2.6-0.8L9.4,12l7.2,3.6c0.7-0.5,1.6-0.8,2.6-0.8c2.4,0,4.4,2,4.4,4.4C23.5,21.5,21.5,23.5,19.1,23.5z"
      />
    </svg>
  );
};

export default Share;
