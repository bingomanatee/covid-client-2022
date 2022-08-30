import * as React from "react";

const SvgTimescale = (props) => (
  <svg width={652} height={72} xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <clipPath id="time_scale_svg__a">
        <path d="M652 0v72H0V0h652Z" />
      </clipPath>
      <clipPath id="time_scale_svg__b">
        <path d="M90 0v16H0V0h90Z" />
      </clipPath>
      <clipPath id="time_scale_svg__c">
        <path d="M4.5 0C6.985 0 9 1.79 9 4S6.985 8 4.5 8 0 6.21 0 4s2.015-4 4.5-4Z" />
      </clipPath>
      <clipPath id="time_scale_svg__d">
        <path d="M146 0v19H0V0h146Z" />
      </clipPath>
      <clipPath id="time_scale_svg__e">
        <path d="M23 0v51H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7h16Zm26 0a7 7 0 0 1 7 7v37a7 7 0 0 1-7 7H34V0h15Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#time_scale_svg__a)">
      <path
        d="M17 31v12h617V31"
        stroke="#969696"
        fill="none"
        strokeMiterlimit={10}
      />
      <g clipPath="url(#time_scale_svg__b)" transform="translate(17 15)">
        <text
          transform="translate(0 11)"
          fontFamily="HelveticaNeue, Helvetica Neue"
          fontSize={12}
        >
          {"January 1 2020"}
        </text>
      </g>
      <g clipPath="url(#time_scale_svg__b)" transform="translate(107 21)">
        <text
          transform="translate(14.88 11)"
          fontFamily="HelveticaNeue, Helvetica Neue"
          fontSize={12}
          textAnchor="center"
        >
          {"Febuary 22"}
        </text>
      </g>
      <g clipPath="url(#time_scale_svg__c)" transform="translate(150 39)">
        <path fill="#FFF" d="M0 0h9v8H0V0z" />
        <path
          d="M4.5 8C6.985 8 9 6.21 9 4S6.985 0 4.5 0 0 1.79 0 4s2.015 4 4.5 4Z"
          stroke="#969696"
          strokeWidth={2}
          fill="none"
          strokeMiterlimit={5}
        />
      </g>
      <g clipPath="url(#time_scale_svg__d)" transform="translate(488 15)">
        <text
          transform="translate(25.964 11)"
          fontFamily="HelveticaNeue, Helvetica Neue"
          fontSize={12}
          textAnchor="right"
        >
          {"(now) August 27, 2022"}
        </text>
      </g>
      <path
        d="M338 18v51h-16a7 7 0 0 1-7-7V25a7 7 0 0 1 7-7h16Zm26 0a7 7 0 0 1 7 7v37a7 7 0 0 1-7 7h-15V18h15Z"
        stroke="#E02020"
        strokeWidth={2}
        fill="none"
        strokeMiterlimit={5}
      />
      <g clipPath="url(#time_scale_svg__e)" transform="translate(315 18)">
        <path fill="#FFE8E8" d="M0 0h56v51H0V0z" />
      </g>
    </g>
  </svg>
);

export default SvgTimescale;
