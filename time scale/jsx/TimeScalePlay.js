import * as React from "react";

const SvgTimescaleplay = (props) => (
  <svg width={652} height={72} xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <clipPath id="time_scale_play_svg__a">
        <path d="M652 0v72H0V0h652Z" />
      </clipPath>
      <clipPath id="time_scale_play_svg__b">
        <path d="M90 0v16H0V0h90Z" />
      </clipPath>
      <clipPath id="time_scale_play_svg__c">
        <path d="M4.5 0C6.985 0 9 1.79 9 4S6.985 8 4.5 8 0 6.21 0 4s2.015-4 4.5-4Z" />
      </clipPath>
      <clipPath id="time_scale_play_svg__d">
        <path d="M146 0v19H0V0h146Z" />
      </clipPath>
      <clipPath id="time_scale_play_svg__e">
        <path d="M27.289 5.367a4 4 0 0 1 1.789 1.788l19.028 38.056A4 4 0 0 1 44.528 51H6.472a4 4 0 0 1-3.578-5.789L21.922 7.155a4 4 0 0 1 5.367-1.788Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#time_scale_play_svg__a)">
      <path
        d="M17 31v12h617V31"
        stroke="#969696"
        fill="none"
        strokeMiterlimit={10}
      />
      <g clipPath="url(#time_scale_play_svg__b)" transform="translate(17 15)">
        <text
          transform="translate(0 11)"
          fontFamily="HelveticaNeue, Helvetica Neue"
          fontSize={12}
        >
          {"January 1 2020\n                "}
        </text>
      </g>
      <g clipPath="url(#time_scale_play_svg__b)" transform="translate(107 21)">
        <text
          transform="translate(14.88 11)"
          fontFamily="HelveticaNeue, Helvetica Neue"
          fontSize={12}
          textAnchor="center"
        >
          {"Febuary 22\n                "}
        </text>
      </g>
      <g clipPath="url(#time_scale_play_svg__c)" transform="translate(150 39)">
        <path fill="#FFF" d="M0 0h9v8H0V0z" />
        <path
          d="M4.5 8C6.985 8 9 6.21 9 4S6.985 0 4.5 0 0 1.79 0 4s2.015 4 4.5 4Z"
          stroke="#969696"
          strokeWidth={2}
          fill="none"
          strokeMiterlimit={5}
        />
      </g>
      <g clipPath="url(#time_scale_play_svg__d)" transform="translate(488 15)">
        <text
          transform="translate(25.964 11)"
          fontFamily="HelveticaNeue, Helvetica Neue"
          fontSize={12}
          textAnchor="right"
        >
          {"(now) August 27, 2022\n                "}
        </text>
      </g>
      <path
        d="m363.845 47.078-38.056 19.028A4 4 0 0 1 320 62.528V24.472a4 4 0 0 1 5.789-3.578l38.056 19.028a4 4 0 0 1 0 7.156Z"
        stroke="#6DD400"
        strokeWidth={2}
        fill="none"
        strokeMiterlimit={5}
      />
      <g
        clipPath="url(#time_scale_play_svg__e)"
        transform="rotate(90 176.5 194.5)"
      >
        <path fill="#EAFFD5" d="M2.472 4.943H48.53V51H2.472V4.943z" />
      </g>
    </g>
  </svg>
);

export default SvgTimescaleplay;
