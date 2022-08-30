import * as React from "react";

const SvgValueScales = (props) => (
  <svg width={231} height={92} xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <clipPath id="value-scales_svg__a">
        <path d="M231 0v92H0V0h231Z" />
      </clipPath>
      <clipPath id="value-scales_svg__b">
        <path d="m30.5 2.31 14.95 8.63a8 8 0 0 1 4 6.929V35.13a8 8 0 0 1-4 6.928L30.5 50.691a8 8 0 0 1-8 0L7.55 42.059a8 8 0 0 1-4-6.928V17.87a8 8 0 0 1 4-6.928L22.5 2.309a8 8 0 0 1 8 0Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#value-scales_svg__a)">
      <g clipPath="url(#value-scales_svg__b)" transform="translate(55 -1)">
        <path d="M3.55 1.238h45.9v50.524H3.55V1.238z" />
        <path
          d="m30.5 2.31 14.95 8.63a8 8 0 0 1 4 6.929V35.13a8 8 0 0 1-4 6.928L30.5 50.691a8 8 0 0 1-8 0L7.55 42.059a8 8 0 0 1-4-6.928V17.87a8 8 0 0 1 4-6.928L22.5 2.309a8 8 0 0 1 8 0Z"
          stroke="#000"
          strokeWidth={2}
          fill="none"
          strokeMiterlimit={5}
        />
      </g>
      <text
        transform="translate(28.756 30)"
        fontFamily="HelveticaNeue, Helvetica Neue"
        fontSize={12}
        textAnchor="right"
      >
        {"100k"}
      </text>
      <g clipPath="url(#value-scales_svg__b)" transform="translate(103 -1)">
        <path fill="#A7A7A7" d="M3.55 1.238h45.9v50.524H3.55V1.238z" />
        <path
          d="m30.5 2.31 14.95 8.63a8 8 0 0 1 4 6.929V35.13a8 8 0 0 1-4 6.928L30.5 50.691a8 8 0 0 1-8 0L7.55 42.059a8 8 0 0 1-4-6.928V17.87a8 8 0 0 1 4-6.928L22.5 2.309a8 8 0 0 1 8 0Z"
          stroke="#A7A7A7"
          strokeWidth={2}
          fill="none"
          strokeMiterlimit={5}
        />
      </g>
      <text
        transform="translate(156 30)"
        fontFamily="HelveticaNeue, Helvetica Neue"
        fontSize={12}
        textAnchor="left"
      >
        {"100k"}
      </text>
      <g clipPath="url(#value-scales_svg__b)" transform="translate(79 40)">
        <path fill="#D7D7D7" d="M3.55 1.238h45.9v50.524H3.55V1.238z" />
        <path
          d="m30.5 2.31 14.95 8.63a8 8 0 0 1 4 6.929V35.13a8 8 0 0 1-4 6.928L30.5 50.691a8 8 0 0 1-8 0L7.55 42.059a8 8 0 0 1-4-6.928V17.87a8 8 0 0 1 4-6.928L22.5 2.309a8 8 0 0 1 8 0Z"
          stroke="#969696"
          strokeWidth={2}
          fill="none"
          strokeMiterlimit={5}
        />
      </g>
      <text
        transform="translate(54.756 71)"
        fontFamily="HelveticaNeue, Helvetica Neue"
        fontSize={12}
        textAnchor="right"
      >
        {"100k"}
      </text>
      <g clipPath="url(#value-scales_svg__b)" transform="translate(127 40)">
        <path fill="#FFF" d="M3.55 1.238h45.9v50.524H3.55V1.238z" />
        <path
          d="m30.5 2.31 14.95 8.63a8 8 0 0 1 4 6.929V35.13a8 8 0 0 1-4 6.928L30.5 50.691a8 8 0 0 1-8 0L7.55 42.059a8 8 0 0 1-4-6.928V17.87a8 8 0 0 1 4-6.928L22.5 2.309a8 8 0 0 1 8 0Z"
          stroke="#FFF"
          strokeWidth={2}
          fill="none"
          strokeMiterlimit={5}
        />
      </g>
      <text
        transform="translate(180 71)"
        fontFamily="HelveticaNeue, Helvetica Neue"
        fontSize={12}
        textAnchor="left"
      >
        {"100k"}
      </text>
    </g>
  </svg>
);

export default SvgValueScales;
