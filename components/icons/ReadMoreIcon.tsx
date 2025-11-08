import React from 'react';

export const ReadMoreIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    width="23" 
    height="22" 
    viewBox="0 0 23 22" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_368_1115)">
      <path 
        d="M19.0731 3.72131L4.25195 18.5425" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M5.7334 3.02954H19.7641V17.0603" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_368_1115">
        <rect width="22" height="22" fill="white" transform="translate(0.793945)"/>
      </clipPath>
    </defs>
  </svg>
);
