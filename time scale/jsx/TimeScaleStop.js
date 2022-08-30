import * as React from "react";

const SvgTimescalestop = (props) => (
  <svg width={652} height={72} xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <clipPath id="time_scale_stop_svg__a">
        <path d="M652 0v72H0V0h652Z" />
      </clipPath>
      <clipPath id="time_scale_stop_svg__b">
        <path d="M90 0v16H0V0h90Z" />
      </clipPath>
      <clipPath id="time_scale_stop_svg__c">
        <path d="M4.5 0C6.985 0 9 1.79 9 4S6.985 8 4.5 8 0 6.21 0 4s2.015-4 4.5-4Z" />
      </clipPath>
      <clipPath id="time_scale_stop_svg__d">
        <path d="M146 0v19H0V0h146Z" />
      </clipPath>
      <clipPath id="time_scale_stop_svg__e">
        <path d="M12 0a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h8Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#time_scale_stop_svg__a)">
      <path
        d="M17 31v12h617V31"
        stroke="#969696"
        fill="none"
        strokeMiterlimit={10}
      />
      <g clipPath="url(#time_scale_stop_svg__b)" transform="translate(17 15)">
        <text
          transform="translate(0 11)"
          fontFamily="HelveticaNeue, Helvetica Neue"
          fontSize={12}
        >
          {"January 1 2020"}
        </text>
      </g>
      <g clipPath="url(#time_scale_stop_svg__b)" transform="translate(107 21)">
        <text
          transform="translate(14.88 11)"
          fontFamily="HelveticaNeue, Helvetica Neue"
          fontSize={12}
          textAnchor="center"
        >
          {"Febuary 22"}
        </text>
      </g>
      <g clipPath="url(#time_scale_stop_svg__c)" transform="translate(150 39)">
        <path fill="#FFF" d="M0 0h9v8H0V0z" />
        <path
          d="M4.5 8C6.985 8 9 6.21 9 4S6.985 0 4.5 0 0 1.79 0 4s2.015 4 4.5 4Z"
          stroke="#969696"
          strokeWidth={2}
          fill="none"
          strokeMiterlimit={5}
        />
      </g>
      <g clipPath="url(#time_scale_stop_svg__d)" transform="translate(488 15)">
        <text
          transform="translate(25.964 11)"
          fontFamily="HelveticaNeue, Helvetica Neue"
          fontSize={12}
          textAnchor="right"
        >
          {"(now) August 27, 2022"}
        </text>
      </g>
      <g clipPath="url(#time_scale_stop_svg__e)" transform="translate(324 20)">
        <path fill="#FFE0E0" d="M0 0h16v48H0V0z" />
      </g>
      <path
        d="M328 20h8a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4Z"
        stroke="#FF8080"
        fill="none"
        strokeMiterlimit={10}
      />
      <g clipPath="url(#time_scale_stop_svg__e)" transform="translate(344 20)">
        <path fill="#FFE0E0" d="M0 0h16v48H0V0z" />
      </g>
      <path
        d="M348 20h8a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4Z"
        stroke="#FF8080"
        fill="none"
        strokeMiterlimit={10}
      />
    </g>
  </svg>
);

export default SvgTimescalestop;
