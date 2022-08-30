import * as React from "react";

const SvgTimemarker = (props) => (
  <svg width={132} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <clipPath id="time_marker_svg__a">
        <path d="M132 0v24H0V0h132Z" />
      </clipPath>
      <clipPath id="time_marker_svg__b">
        <path d="M90 0v16H0V0h90Z" />
      </clipPath>
      <clipPath id="time_marker_svg__c">
        <path d="M4.5 0C6.985 0 9 1.79 9 4S6.985 8 4.5 8 0 6.21 0 4s2.015-4 4.5-4Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#time_marker_svg__a)">
      <g clipPath="url(#time_marker_svg__b)" transform="translate(15 -2)">
        <text
          transform="translate(14.88 11)"
          fontFamily="HelveticaNeue, Helvetica Neue"
          fontSize={12}
          textAnchor="center"
        >
          {"Febuary 22"}
        </text>
      </g>
      <g clipPath="url(#time_marker_svg__c)" transform="translate(58 16)">
        <path fill="#FFF" d="M0 0h9v8H0V0z" />
        <path
          d="M4.5 8C6.985 8 9 6.21 9 4S6.985 0 4.5 0 0 1.79 0 4s2.015 4 4.5 4Z"
          stroke="#969696"
          strokeWidth={2}
          fill="none"
          strokeMiterlimit={5}
        />
      </g>
    </g>
  </svg>
);

export default SvgTimemarker;
