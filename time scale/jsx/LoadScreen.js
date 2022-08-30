import * as React from "react";

const SvgLoadscreen = (props) => (
  <svg width={205} height={194} xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <clipPath id="load_screen_svg__a">
        <path d="M205 0v194H0V0h205Z" />
      </clipPath>
      <clipPath id="load_screen_svg__b">
        <path d="m44.5 3.464 21.342 12.322a12 12 0 0 1 6 10.392v24.644a12 12 0 0 1-6 10.392L44.5 73.536a12 12 0 0 1-12 0L11.158 61.214a12 12 0 0 1-6-10.392V26.178a12 12 0 0 1 6-10.392L32.5 3.464a12 12 0 0 1 12 0Z" />
      </clipPath>
      <clipPath id="load_screen_svg__c">
        <path d="M215 0v77H0V0h215Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#load_screen_svg__a)">
      <g clipPath="url(#load_screen_svg__b)" transform="translate(98 -1)">
        <path fill="#D7D7D7" d="M5.158 1.856h66.684v73.288H5.158V1.856z" />
      </g>
      <g clipPath="url(#load_screen_svg__b)" transform="translate(64 58)">
        <path fill="#D7D7D7" d="M5.158 1.856h66.684v73.288H5.158V1.856z" />
      </g>
      <g clipPath="url(#load_screen_svg__b)" transform="translate(29 -1)">
        <path fill="#D7D7D7" d="M5.158 1.856h66.684v73.288H5.158V1.856z" />
      </g>
      <g clipPath="url(#load_screen_svg__b)" transform="translate(133 58)">
        <path fill="#D7D7D7" d="M5.158 1.856h66.684v73.288H5.158V1.856z" />
      </g>
      <g clipPath="url(#load_screen_svg__b)" transform="translate(99 118)">
        <path fill="#D7D7D7" d="M5.158 1.856h66.684v73.288H5.158V1.856z" />
      </g>
      <g clipPath="url(#load_screen_svg__b)" transform="translate(29 118)">
        <path fill="#D7D7D7" d="M5.158 1.856h66.684v73.288H5.158V1.856z" />
      </g>
      <g clipPath="url(#load_screen_svg__b)" transform="translate(-5 58)">
        <path fill="#D7D7D7" d="M5.158 1.856h66.684v73.288H5.158V1.856z" />
      </g>
      <g clipPath="url(#load_screen_svg__c)" transform="translate(-5 58)">
        <text transform="translate(65.938 29)">
          <tspan
            x={65.938}
            y={0}
            fontFamily="HelveticaNeue, Helvetica Neue"
            fontSize={12}
            textAnchor="center"
          >
            {"loading country "}
          </tspan>
          <tspan
            x={63.82}
            y={14}
            fontFamily="HelveticaNeue, Helvetica Neue"
            fontSize={12}
            textAnchor="center"
          >
            {"and COVID data"}
          </tspan>
          <tspan
            x={77.284}
            y={28}
            fontFamily="HelveticaNeue, Helvetica Neue"
            fontSize={12}
            textAnchor="center"
          >
            {"please wait"}
          </tspan>
        </text>
      </g>
    </g>
  </svg>
);

export default SvgLoadscreen;
